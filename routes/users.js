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

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  
  client.get(`/users/${req.params.id}`, function (err, request, response, obj){
   assert.ifError(err)
   
   res.json(obj)
  })

});

/* PUT users listing. */
router.put('/:id', function(req, res, next) {
  
  client.get(`/users/${req.params.id}`, req.body, function (err, request, response, obj){
   assert.ifError(err)
   
   res.json(obj)
  })

});

/* DELETE users listing. */
router.delete('/:id', function(req, res, next) {
  
  client.del(`/users/${req.params.id}`, function (err, request, response, obj){
   assert.ifError(err)
   
   res.json(obj)
  })

});

/* POST users listing. */
router.post('/', function(req, res, next) {
  
  client.post(`/users`, req.body, function (err, request, response, obj){
   assert.ifError(err)
   
   res.json(obj)
  })

});

module.exports = router;
