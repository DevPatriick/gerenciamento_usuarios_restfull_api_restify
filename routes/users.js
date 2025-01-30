var express = require('express');
var router = express.Router();

// chamando o assert
var assert = require('assert');

// chamando o restify
var restify = require('restify-clients');

// Criando o JSON cliente
var client = restify.createJsonClient({
  url: 'http://localhost:4000'
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  
   client.get('/users', function (err, request, response, obj){
    assert.ifError(err)
    
    res.end(JSON.stringify(obj, null, 2))
   })

});

module.exports = router;
