const request = require('supertest');
const express = require('express');
 
const app = express();
 
request(app)
  .get('/NonExistantRoute')
  .expect(404)
  .end(function(err, res) {
    if (err) throw err;
  });