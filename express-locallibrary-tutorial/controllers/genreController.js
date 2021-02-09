var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');
var {body, validationResult} = require('express-validator')

// Display list of all Genre.
exports.genre_list = function(req, res) {
    // res.send('NOT IMPLEMENTED: Genre list');
    Genre.find()
    .exec(function(err, genre){
        if(err){return next(err)}
        res.render('genre_list', {title: "Genre List", genre_name: genre})
    })
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res, next) {
    // res.send('NOT IMPLEMENTED: Genre detail');
    async.parallel({
        genre: function(callback){
            Genre.findById(req.params.id)
            .exec(callback)
        },
        genre_books: function(callback){
            Book.find({ 'genre': req.params.id })
            .exec(callback)
        }
    }, function(err, results){
        if(err){return next(err)}
        if(results.genre == null){
            var err = new Error("Genre not found")
            err.status = 404
            return next(err) 
        }else if(results.genre_books ==null){
            var err = new Error("There is no Book for this Genre")
            err.status= 404
            return next(err)
        }
        res.render('genre_detail',{title: "Genre Details", genre: results.genre, genre_books: results.genre_books})
    })
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    // res.send('NOT IMPLEMENTED: Genre create GET');
     res.render('genre_form', {title: "Create Genre"})
};

// Handle Genre create on POST.
exports.genre_create_post =  [
    body('name', 'Genre can not be Empty').trim().isLength({min: 1}).escape(),
    (req, res, next)=>{
        var errors = validationResult(req)

        var genre = new Genre({
            name: req.body.name
        })

       if(!errors.isEmpty()){
           res.render("genre_form", {title:"Create Genre", genre: genre, errors: errors.array()});
           return;
       }else{
        Genre.findOne({'name': req.body.name})
        .exec(function(err, found_genre){
            if(err){return next(err)}
            if(found_genre){
                res.redirect(found_genre.url)
            }else{
                genre.save(function(err) {
                    if(err){return next(err)}
                    res.redirect(genre.url) 
                })
            }
        });
       }
    }
];

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res, next) {
  async.parallel({
      genre: function(callback){
        Genre.findById(req.params.id)
        .exec(callback)
      },
      genre_books: function(callback){
          Book.find({'genre': req.params.id})
          .exec(callback)
      }
  }, function(err, results){
    if(err){return next(err)}

    if(results.genre == null){
        res.redirect("/catalog/genres")
    }

    res.render("genre_delete", {title:"Delete Genre", genre: results.genre, genre_books: results.genre_books})

  })
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res, next) {
    
    async.parallel({
        genre: function(callback){
            Genre.findById(req.body.id)
            .exec(callback)
        },
        genre_books: function(callback){
            Book.find({'genre': req.body.id})
            .exec(callback)
        }
    }, function(err, results){
        if(err){return next(err)}

        if(results.genre_books.length  > 0 ) {
            res.render("genre_delete", {title:"Delete Genre", genre: results.genre, genre_books: results.genre_books})
            return;
        }else{
            Genre.findByIdAndRemove(req.body.generid, function deleteGenre(err){
                if(err){return next(err)}

                res.redirect('/catalog/genres')
            })
        }
    })
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res, next) {
   Genre.findById(req.params.id)
   .exec(function(err, genres){
    if(err){return next(err)}
    res.render("genre_form", {title: "Update Genre", genre: genres})
   })
};

// Handle Genre update on POST.
exports.genre_update_post = [
    // Sanitize inputs
    // Create an anonymous function
    // Extract errors
    // Create a new Obj
    // Check if not errors is Empty
    // if true return former content
    // if false update content

    body("name","Name cannot be empty").trim().isLength().escape(),

    (req, res, next)=> {
      const errors = validationResult(req);

      const genre = new Genre({
          _id: req.params.id,
        name: req.body.name
      })

      if(!errors.isEmpty()){
        res.render("genre_form", {title: "Update Genre", genre: genre, errors: errors.array()});
        return;
      }else{
        Genre.findByIdAndUpdate(req.params.id, genre, {}, function(err, theGenre){
            if(err){return next(err)}
            res.redirect(theGenre.url)
        })
      }
    }
]