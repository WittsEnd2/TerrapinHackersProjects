var express = require('express');
var session = require('express-session');
var encryption = require('../encrypt');
var router = express.Router();




// var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req,res,next){
  var db = req.db;
  
  var userName = req.body.username;
  const passwordField = req.body.password;

  var collection = db.get('users');

  collection.findOne({
    "username" : userName,
  }, function(err, doc){;
    if(err) {
      console.log("Error: ", err);

    } else {
      if (encryption.isPasswordCorrect(doc.password.hash, doc.password.salt, doc.password.iterations, passwordField)){
        req.session.user = doc;
        console.log("User successfully logged in!");
      } else {
        console.log("Incorrect password/username");
      }
      console.log(req.session.user);
      req.session.save(); 
    }
  });
  
  res.end();  
  
});
module.exports = router;
