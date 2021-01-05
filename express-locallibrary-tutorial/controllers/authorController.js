var Author = require('../models/author')
var Book = require('../models/book')
var async =require('async');
var {body, validationResult} = require('express-validator')

// Display list of all Authors.
exports.author_list = function(req, res, next){
  // res.send('NOT IMPLEMENTED: Author list')
  Author.find()
  .sort([['family_name', 'ascending']])
  .exec(function(err, author_list){
    if(err){return next(err)};
    res.render("author_list", {title: "All Authors", author_list: author_list })
  })
} 

// Display detail page for a specific Author.
exports.author_detail = function(req, res, next){
  // res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id)
  async.parallel({
    author: function(callback){
      Author.findById(req.params.id)
      .exec(callback)
    },
    author_books: function(callback){
      Book.find({ 'author': req.params.id },'title summary')
      .exec(callback)
    }
  }, function(err, results){
    if(err){
      return next(err)
    }
    if(results.author_books ==null){
      var err = new Error("Author has no Books Or Books no found for Author")
      err.status= 404
      return err
    }
    res.render('author_detail', {title: "Author Details", author:results.author, author_books: results.author_books})
  });
} 

// Display Author create form on GET.
exports.author_create_get = function(req , res){
  // res.send('NOT IMPLEMENTED: Author create GET')
  res.render("author_form", {title:"Create Author"})
}

// Handle Author create on POST.
exports.author_create_post =  [
  // res.send('NOT IMPLEMENTED: Author create POST')
  // Sanitize and Validate input =>First Element
  // create anonymous function  =>Second Element
  // Get the error fom validationResult request
  // Create a new variable for genre
  // Check if the validationResult isEmpty() and return
  // Query Database to see if it already Exist
  // Else save the new name
  // Redirect to url
  body('first_name')
  .trim().isLength({min:2}).escape()
  .withMessage('First name can not be blank.')
  .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),

  body('family_name')
  .trim().isLength({min:2}).escape()
  .withMessage('Family name can not be blank')
  .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),

  body('date_of_birth', 'Invalid date of birth')
  .optional({ checkFalsy: true }).isISO8601().toDate(),

  body('date_of_death', 'Invalid date of death')
  .optional({ checkFalsy: true }).isISO8601().toDate(),
 
  (req,res, next)=>{
    var errors = validationResult(req);
    var author = new Author({
      first_name: req.body.first_name,
      family_name: req.body.family_name,
      date_of_birth: req.body.date_of_birth,
      date_of_death: req.body.date_of_death
    })

    if(!errors.isEmpty()){
      res.render('author_form', {title: "Create Author", author: author, errors: errors.array()});
      return;
    }else{
      Author.findOne({'name': req.body.first_name})
      .exec(function(err, found_author){
        if(err){return next(err)}
        if(found_author){
          res.redirect(found_author.url)
        }else{
          author.save(function(err){
            if(err){return next(err)}
            res.redirect(author.url)
          })
        }
      })
    }
  }
]

// Display Author delete form on GET.
exports.author_delete_get = function(req,res){
  res.send('NOT IMPLEMENTED: Author delete GET ' + req.params.id)
}

// Handle Author delete on POST.
exports.author_delete_post = function(req,res){
  res.send('NOT IMPLEMENTED: Author delete POST')
}

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Author update GET ' + req.params.id);
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Author update POST');
};