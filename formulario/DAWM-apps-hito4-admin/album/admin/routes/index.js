var express = require('express');
const axios = require('axios')
var router = express.Router();

const multer = require('multer')
const FormData = require('form-data');
const upload = multer()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/photos', async function (req, res, next) {

  const URL = 'http://localhost:4444/fotos/findAll/json'
  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  const response = await axios.get(URL, config)

  response.data.map(item => { item.url = 'http://localhost:4444/' + item.ruta.replace('public/', '') })


  res.render('fotos', { title: 'Fotos', fotos: response.data });
})

router.get('/photos/add', function (req, res, next) {
  res.render('fotos_formulario', { title: 'Express' });
});


router.get('/photos/put/:id', async function (req, res, next) {

  let id = req.params.id;

  const URL = 'http://localhost:4444/fotos/findAllById/' + id + '/json'
  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  const response = await axios.get(URL, config)

  response.data.map(item => { item.url = 'http://localhost:4444/' + item.ruta.replace('public/', '') })

  console.log(response.data[0]);

  res.render('fotos_update', { title: 'Update', foto: response.data[0] });

});


router.post('/photos/save', upload.single('route'), async function (req, res, next) {

  let { title, description, rate } = req.body
  let { buffer, originalname } = req.file

  const URL = 'http://localhost:4444/rest/fotos/save'

  let data = new FormData()
  data.append("titulo", title)
  data.append("descripcion", description)
  data.append("calificacion", rate)
  data.append("ruta", originalname)
  data.append("archivo", buffer, originalname)

  const config = {
    headers: data.getHeaders(),
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }

  const response = await axios.post(URL, data, config);


  if (response.status == '200' && response.statusText == 'OK') {
    res.redirect('/photos')
  } else {
    res.redirect('/')
  }


});

router.post('/photos/update',upload.single('route'), async function (req, res, next) {

  let { id, title, description, rate } = req.body
  let { buffer, originalname } = req.file
  

  const URL = 'http://localhost:4444/rest/fotos/update'

  let data = new FormData()
  data.append("id",id),
  data.append("titulo", title)
  data.append("descripcion", description)
  data.append("calificacion", rate)
  data.append("ruta", originalname)
  data.append("archivo", buffer, originalname)
  
  const config = {
    headers: data.getHeaders(),
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }

  const response = await axios.put(URL, data, config);


  if (response.status == '200' && response.statusText == 'OK') {
    res.redirect('/photos')
  } else {
    res.redirect('/')
  }

});


router.get('/photos/delete/:id', async function (req, res, next) {

  let id = req.params.id;


  const URL = 'http://localhost:4444/rest/fotos/delete/' + id;

  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }

  const response = await axios.delete(URL, config);

  if (response.status == '200') {
    res.redirect('/photos')
  } else {
    res.redirect('/')
  }


});




module.exports = router;
