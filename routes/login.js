var express = require('express');
var router = express.Router();
var db = require('../db');
var crypto = require('../encrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res, next){
  var userCollection = db.get().collection('users');
  if (!userCollection) {
    db.get().createCollection('users');
    userCollection = db.get().collection('users');
  }
  if (userCollection.ensureIndex({'username' : req.body.username}, {unique : true}) ){
    console.log('User Found!');
  } else {
    console.log('User Found!');
    userCollection.insert({
      'username' : req.body.username,
      'password' : crypto.encrypt(req.body.password)
    });
    
  }
  res.redirect('/');
  res.end('It worked!');

})

module.exports = router;
