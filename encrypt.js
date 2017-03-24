var bcrypt = require('bcrypt');

exports.cryptPassword = function(password) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err) 
      return err;

    bcrypt.hash(password, salt, function(err, hash) {
      return hash;
    });

  });
};

exports.comparePassword = function(password, userPassword) {
   bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
      if (err) 
        return err;
      return isPasswordMatch;
   });
};