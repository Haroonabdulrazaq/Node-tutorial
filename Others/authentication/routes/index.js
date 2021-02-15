const express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=>{
  res.render('sign-up-form')
})



module.exports = router;