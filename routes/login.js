var express = require('express');
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
  var password = encryption.cryptPassword(req.body.password);

  var collection = db.get('users');

  collection.insert({
    "username" : userName,
    "password" : password
  }, function(err,doc){
    if(err) {
      res.send("There was a problem adding the information to the db");
    } else {
      res.redirect("login");
    }
  })
})
/*
router.post('/', function(req, res, next){
  db.connect('mongodb://localhost:27017/terrapin-hackers-projects', function(err){
    if (err){
      console.log('Unable to connect to Mongo.');
      process.exit(1);
    }
  });
  var userCollection = db.get().collection('users');
  console.log(userCollection.find().pretty());
  if (!userCollection) {
    console.log("No collection found");
    db.get().createCollection('users');
    userCollection = db.get().collection('users');
  } else {
    console.log("Collection found");
  }
  if (userCollection.find({username : req.body.username}).count() != 0){
    console.log(userCollection.find({username : req.body.username}).count());
  } else {
    console.log('User Not Found!');
    userCollection.insert({
      username : req.body.username,
      password : crypto.encrypt(req.body.password)
    });
    
  }
  db.close();
  res.redirect('/');
  res.end('It worked!');

})

*/

module.exports = router;
