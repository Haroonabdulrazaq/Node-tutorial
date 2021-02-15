var express = require('express');
var path = require('path');
var nodemailer = require('nodemailer');

let app = express()

// Set view Template
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')


// Parsing all JSON incoming Object
app.use(express.json())
app.use(express.urlencoded({extended: true})) //and URL

// Putting all static folder in a folder called public 
app.use(express.static(path.join(__dirname, 'public')))

// Get Route
app.get('/', (req,res)=>{
  res.render("index", {title:"Welcome to Homepage"})
})

app.get('/about', (req,res)=>{
  res.render("about", {title:"Welcome to About page"})
})
 

app.get('/contact', (req,res)=>{
  res.render("contact")
 
});

app.post('/contact/', function(req,res){
  console.log("Test");
  // Nodelmailer code is commented at the bottom not working in the post route
});


app.listen(3000)
console.log("Server is running at Port 3000...")

//    var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "haroonabdulrazaq@gmail.com",
//     pass: ""
//   }
// });

// var mailOptions = {
//   from: "Haroon <haroonabdulrazaq@gmail.com>",
//   to: "haroonabdulrazaqo@gmail.com",
//   subject: "Website submission",
//   text: "Testing Nodemialer with Nodejs",
//   html: "<h2>Testing Nodemialer with Nodejs</h2>"
// }
// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log("Error Occured .."+error);
//     // res.redirect('/')
//   }else{
//     console.log("Message sent Sucessfully.."+ info.response)
//     // res.redirect('/')
//   }

// })

// text: "You have a submission..Name:"+req.body.name +"Email"+req.body.message+"message:" +req.body.message,
  // html: "<p>You have a submission..Name</p><ul><li>Name: "+req.body.name+"</li><li>Email: "+req.body.email+"</li><li>Message: "+req.body.message+"</li><ul>",