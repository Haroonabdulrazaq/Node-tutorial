var Author = require('../models/author')
var Book = require('../models/book')
var async =require('async')

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
exports.author_create_post = function(req,res){
  // res.send('NOT IMPLEMENTED: Author create POST')
  // Sanitize and Validate input =>First Element
  // create anonymous function  =>Second Element
  // Get the error fom validationResult request
  // Create a new variable for genre
  // Check if the validationResult isEmpty() and return
  // Query Database to see if it already Exist
  // Else save the new name
  // Redirect to url
}

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