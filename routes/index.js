var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.user);
  res.render('index', { title: 'Express' });

});

router.post('/', function(req, res, next){
  var userCollection = db.get().collection('users');
  if (!userCollection) {
    db.createCollection('users');
    userCollection = db.collection('users');
  }
  userCollection.insert({
    'username' : req.body.username,
    'password' : req.body.password
  });

})

module.exports = router;
