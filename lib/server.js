'use strict';

const express = require('express');
const logRequest = require('./logger.js');
const Model = require('../model/memory-data-model.js');
const memory_data_model = new Model ;
const app = express();

const timeStamp = (req, res, next) => {
  req.requestTime = new Date();
  if (Date.now) { 
    Date.now = function() { 
      return new Date().getTime(); },
    console.log('The Time:' , req.requestTime.toString());
    next();
  }};

app.use(express.json());
app.use(logRequest);
app.use(timeStamp);


function notFoundHandler(req, res, next) {
  res.status(404);
  res.statusMessage = 'Not Found!';
  res.json({ error: 'Not Found'});
}


app.get('/crash-error', (req, res) => {
  throw new Error('Error');
});

/// Categories ///////////////////////////////

app.get('/categories', (req , res) => {
  return memory_data_model.get()
    .then(data => {
      res.status(200);
      res.json(data);
    });
});


app.post('/categories', (req , res) => {
  let record = req.body;
  return memory_data_model.create(record)
    .then(data => {
      res.status(201);
      res.json(data);
    });
});

app.put('/categories/:_id', (req , res) => {
  let id = req.params._id ;
  let record = req.body ;
  return memory_data_model.update(id , record)
    .then(data => {
      res.json(data);
    });
});

app.delete('/categories/:_id', (req , res) => {
  let id = req.params._id ;
  return memory_data_model.delete(id)
    .then(() => {
      res.send({ Message :'Deleted' });
    });
});

//////////////////////////////////////////////

/// Products /////////////////////////////////

app.get('/products', (req , res) => {
  return memory_data_model.get()
    .then(data => {
      res.status(200);
      res.json(data);
    });
});


app.post('/products', (req , res) => {
  let record = req.body;
  return memory_data_model.create(record)
    .then(data => {
      res.status(201);
      res.json(data);
    });
});

app.put('/products/:_id', (req , res) => {
  let id = req.params._id ;
  let record = req.body ;
  return memory_data_model.update(id , record)
    .then(data => {
      res.json(data);
    });
});

app.delete('/products/:_id', (req , res) => {
  let id = req.params._id ;
  return memory_data_model.delete(id)
    .then(() => {
      res.send({ Message :'Deleted' });
    });
});

//////////////////////////////////////////

function errorHandler(err, req, res, next) {
  res.status(500);
  res.statusMessage = 'Generic Server Error!';
  res.json({ error: err });
}

app.get('/test-error' , (req , res , next) => {
  throw errorHandler();
});

app.get('*' , notFoundHandler);

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`listening on ${PORT}`));
  },

};