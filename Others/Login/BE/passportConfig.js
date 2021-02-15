const User = require('./user')
const bcrypt= require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport){
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { 
          return done(err);
        };
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        bcrypt.compare(password, user.password, (err, res)=>{
          if(err) {throw err }
          if(res){
            return done(null, user);
          }else{
            return done(null, false, { message: "Incorrect password" });
          }
        })
      });
    })
  )

  // Serialize and Deserialize
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
