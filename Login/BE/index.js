const express = require('express');
const mongoose  = require('mongoose');
const bodyParser  = require('body-parser');
const passport  = require('passport');
const passportLocal  = require('passport-local').Strategy;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const User = require('./user');
const mongoDb = 'mongodb+srv://Haroonabdulrazaq:haroon123@cluster0.4o3qm.mongodb.net/AuthDB?retryWrites=true&w=majority';
mongoose.connect(mongoDb, {useUnifiedTopology: true, useNewUrlParser: true},()=>{
  console.log("Mongoose is connected");
});

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(session({secret: "cats", resave: false, saveUninitialized: true}));
app.use(cookieParser("cats"));
app.use(passport.initialize());
app.use(passport.session());

require('./passportConfig')(passport);

// Routes

app.post('/signin', (req,res, next)=>{
  passport.authenticate("local", (err, user, info)=>{
    if(err) { throw err}
    if(!user)res.send("No user exist");
    else{
      req.logIn(user, err=>{
        if(err){return err}
        console.log(req.user);
        console.log("Sucessfully LoggedIn");
        res.redirect('/users')
      })
    }
  })(req, res, next)
});

app.post('/signup', (req,res)=>{
 User.findOne({username: req.body.username}, async(err, doc)=>{
    if(err) throw err;
    if(doc){
      res.send("User already exist, try another username")
    }
    if(!doc){
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword
      })
      await newUser.save();
      console.log("User saved into DB")
    }
 })
});

app.get('/users', (req,res)=> {
  res.send(req.user)
});

app.get("/signout", (req, res)=>{
  res.redirect("/")
  req.logout();
  console.log("Signout successful");
});

app.listen(3001, ()=>{
  console.log("Server started on port 3001")
});