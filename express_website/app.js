var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');
const { urlencoded } = require('body-parser');

let app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.get('/', (req,res)=>{
  res.send("<h1>Hello world!</h1>")
})

app.listen(3000)
console.log("Server is running at Port 3000...")