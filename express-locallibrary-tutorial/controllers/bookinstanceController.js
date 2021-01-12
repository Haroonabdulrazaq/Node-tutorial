var BookInstance = require('../models/bookinstance');
var Book = require('../models/book');
const { body,validationResult } = require('express-validator');

// Display list of all BookInstances.
exports.bookinstance_list = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: BookInstance list');
  BookInstance.find()
  .populate('book')
  .exec(function(err, list_bookinstances){ 
    if(err){return next(err)};
    res.render('bookinstance_list', {title: "Book Instance List", bookinstance_list: list_bookinstances})
  })
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function(req, res) {
  // res.send('NOT IMPLEMENTED: BookInstance detail: ' + req.params.id);
  BookInstance.findById(req.params.id)
  .populate('book')
  .exec(function(err, results){
    if(err){return next(err)}
    if(results == null){
      var err = new Error('Book Instance not found!')
      err.status = 404
      return next(err)
    }
    res.render('bookinstance_detail',{title: "Book Instance Detail", bookinstance_detail: results})
  })
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function(req, res) {
  // res.send('NOT IMPLEMENTED: BookInstance create GET');
  Book.find({}, 'title')
  .exec(function(err, books){
    if(err){return next(err)}

    res.render("bookinstance_form", {title: "Create Book Instance", book_list: books})
  })
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
  body("book", "Book must be specified").trim().isLength({min:1}).escape(),
  body("imprint", "Imprint must be specified").trim().isLength({min:1}).escape(),
  body("status").escape(),
  body("due_back", "Imvalid date").optional({ checkFalsy: true }).isISO8601().toDate(),

  (req, res, next)=>{
    const errors = validationResult(req);

    var bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    })

    if(!errors.isEmpty()){
      Book.find({})
      .exec(function(err, books){
        if(err){return next(err)}
        res.render("bookinstance_form", {title: "Create Book Instance", book_list: books , selected_book: bookinstance.book._id , errors: errors.array(), bookinstance: bookinstance });
      });
      return
    }
    else {
      bookinstance.save(function (err) {
        res.redirect(bookinstance.url)
      })
    }
  }
]
// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: BookInstance update POST');
};