const request = require('supertest');
const express = require('express');
 
const app = express();
 
request(app)
  .get('/items')
  .expect(403, done)
  .end(function(err, res) {
    if (err) throw err;
  });