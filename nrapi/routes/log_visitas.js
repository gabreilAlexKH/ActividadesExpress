
var express = require('express');
var router = express.Router();


const models = require('../models').default;


router.get('/findAll/json', function(req, res, next) {

  models.log_visitas.find( (err, response) => {
      if (err) {
          return res.status(500).json({
              message: 'Error when getting log_visitas.',
              error: err
          });
      }

      return res.json(response);
  });

});

router.get('/findById/:_id/json', function(req, res, next) {

  var _id = req.params._id;

  models.log_visitas.findOne({_id: _id}, function (err, response) {
      if (err) {
          return res.status(500).json({
              message: 'Error when getting log_visitas.',
              error: err
          });
      }

      if (!response) {
          return res.status(404).json({
              message: 'No such log_visitas'
          });
      }

      return res.json(response);
  });

});

router.get('/findAllByGender/:genero/json', function(req, res, next) {

    var genero = req.params.genero;
  
    models.log_visitas.find({genero: genero}, function (err, response) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting log_visitas.',
                error: err
            });
        }
  
        if (!response) {
            return res.status(404).json({
                message: 'No such log_visitas'
            });
        }
  
        return res.json(response);
    });
  
  });


  router.get('/findByUser/:usuario/json', function(req, res, next) {

    var usuario = req.params.usuario;
  
    models.log_visitas.findOne({usuario: usuario}, function (err, response) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting log_visitas.',
                error: err
            });
        }
  
        if (!response) {
            return res.status(404).json({
                message: 'No such log_visitas'
            });
        }
  
        return res.json(response);
    });
  
  });

  router.get('/findAllByTime/:tiempo_navegacion_seg_menor/:tiempo_navegacion_seg_mayor/json', function(req, res, next) {

    var tempMen = req.params.tiempo_navegacion_seg_menor;
    var tempMay = req.params.tiempo_navegacion_seg_mayor;

  
    models.log_visitas.find({tiempo_navegacion_seg: { $gte: tempMen, $lte: tempMay }}, function (err, response) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting log_visitas.',
                error: err
            });
        }
  
        if (!response) {
            return res.status(404).json({
                message: 'No such log_visitas'
            });
        }
  
        return res.json(response);
    });
  
  });



module.exports = router;
