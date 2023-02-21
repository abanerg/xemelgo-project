const express = require('express');
const router = express.Router();
const login = require('../database/login')


router.put('/', async function(req, res, next) {
  try {
    res.json(await login.getPasswordHash(req.body));
  } catch (err) {
    console.error(`Error while attempting to log-in`, err.message);
    next(err);
  }
});

module.exports = {
    router
}
