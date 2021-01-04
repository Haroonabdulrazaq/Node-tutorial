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
    res.render("author_list", {title: "All Author", author_list: author_list })
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
      Book.find(req.params.id)
      .exec(callback)
    }
  }, function(err, result){
    if(err){
      return next(err)
    }
  })
} 

// Display Author create form on GET.
exports.author_create_get = function(req , res){
  res.send('NOT IMPLEMENTED: Author create GET')
}

// Handle Author create on POST.
exports.author_create_post = function(req,res){
  res.send('NOT IMPLEMENTED: Author create POST')
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