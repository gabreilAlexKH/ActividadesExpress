var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Etiqueta = require('../models').etiqueta;  

router.get('/findAll/json', function(req, res, next) {  

  
  Etiqueta.findAll({  
      attributes: { exclude: ["updatedAt"] }  
  })  
  .then(etiquetas => {  
      res.json(etiquetas);  
  })  
  .catch(error => res.status(400).send(error)) 

});

router.get('/findAll/view', function(req, res, next) {  

  
  Etiqueta.findAll({  
      attributes: { exclude: ["updatedAt"] }  
  })  
  .then(etiquetas => {  
      res.render('etiquetas', { title: 'Etiquetas', arrEtiquetas: etiquetas });  
  })  
  .catch(error => res.status(400).send(error)) 

});

module.exports = router;