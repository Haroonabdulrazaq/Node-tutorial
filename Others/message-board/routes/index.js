const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mini Message-Board', messages: messages });
  next()
});

router.get('/new', function(req, res, next) {
   res.render('form');
  //  next()
});

router.post('/new', function(req, res, next) {
 messages.push({
    text: req.body.message,
    user: req.body.user,
    added: new Date()
  });
  res.redirect('/')
});
  

module.exports = router;
