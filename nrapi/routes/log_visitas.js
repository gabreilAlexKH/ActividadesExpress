
var express = require('express');
const axios = require('axios')
var router = express.Router();



module.exports = router;


router.get('/findAll/json', async function(req, res, next) {
  
    const URL = 'https://nosql-63d27-default-rtdb.firebaseio.com/collection.json'

    

    const response = await axios.get(URL)
      
    res.json(response.data);

})