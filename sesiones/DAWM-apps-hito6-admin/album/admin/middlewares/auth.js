var express = require('express');
  var router = express.Router();

  var auth = (req, res, next) => {
      
    if (req.session && req.session.user !== undefined ) {
      return next();
    } else {
      res.redirect('/login');
    }
        
  };

  module.exports = auth;