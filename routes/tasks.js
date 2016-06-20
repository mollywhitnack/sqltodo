'use strict'

const express = require('express');
let router =  express.Router();
let Task = require('../models/task');

router.get('/', function(req, res){
    Task.getAll(function(err, tasks){
      if(err) return res.status(400).send(err);
      res.send(tasks);
    })
})

router.post('/', function(req, res){
  console.log(req.body);
  Task.create(req.body, function(err){
    if(err) return res.status(400).send(err);
    res.send();
  });
});

router.delete('/:id', function(req, res){
  Task.delete(req.params.id, function(err){
    res.send();
  });
});

router.put('/:id', function(req, res){
  Task.update(req.params.id, req.body, function(err){
    if(err) return res.status(400).send(err);
    res.send();
  });
});

module.exports = router;