const express= require('express');
const path = require('path');
const session = require('express-session');
const passport =require('passport');
const LocalStrategy =require('passport-local').Strategy;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const mongoDb = 'mongodb+srv://Haroonabdulrazaq:haroon123@cluster0.4o3qm.mongodb.net/AuthDB?retryWrites=true&w=majority';
mongoose.connect(mongoDb, {useUnifiedTopology: true, useNewUrlParser: true});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "mongo connection error"));

const User = mongoose.model(
  "User",
  new Schema ({
    username: {type: String, required: true},
    password: {type: String, required: true}
  })
)

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({ secret: "cats", resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({extended: false}))

var indexRouter = require('./routes/index');


// Function One
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      };
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res)=>{
        if(err){return err}
        if(res){
          return done(null, user);
        }else{
          return done(null, false, { message: "Incorrect password" });
        }
      })
    });
  })
);

//To have acess tocurrent User all through out the app view
app.use(function(req, res, next) {
  res.locals.currentUser = res.user
  next();
})
// Function 2 and 3
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/error"
  })
);

app.get("/", (req, res) => {
  res.render("index", {user: req.user})
});

app.use('/sign-up', indexRouter)

app.post("/sign-up", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword)=>{
    if(err){return err}
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    }).save(err => {
      if (err) { 
        return next(err);
      };
      res.redirect("/");
    });
  });
})

app.get('/error', (req, res, next)=>{
  res.render('error')
})

app.get("/log-out", (req, res) => {
  req.logout();
  res.redirect("/");
});


app.listen(3000, ()=> console.log("App listening on part 3000!!"))