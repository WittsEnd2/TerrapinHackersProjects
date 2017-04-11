var express = require('express');
var encryption = require('../encrypt');
var router = express.Router();




// var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
  console.log("Cookies: ", req.cookies);
});

router.post('/', function(req,res,next){
  var db = req.db;
  
  var userName = req.body.username;
  var password = encryption.hashPassword(req.body.password);

  var collection = db.get('users');
  collection.find({"username" : userName}, {limit : 1}, function(err, docs){
    if(err){
      console.log("Error: ", err);
    } else {
      if (docs.length === 0) {
        collection.insert({
          "username" : userName,
          "password" : password
        }, function(err, doc){
          if(err) {
            res.send("There was a problem adding the information to the db");
          } else {
            res.redirect("login");
          }
        });
      }
      console.log(docs);
    }
  })

});
module.exports = router;
