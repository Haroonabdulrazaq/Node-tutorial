var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');
const { urlencoded } = require('body-parser');

let app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req,res)=>{
  res.render("index", {title:"Welcome to Homepage"})
})

app.get('/about', (req,res)=>{
  res.render("about", {title:"Welcome to About page"})
})
app.get('/contact', (req,res)=>{
  res.render("contact", {title:"Contact me here!"})
})

app.listen(3000)
console.log("Server is running at Port 3000...")