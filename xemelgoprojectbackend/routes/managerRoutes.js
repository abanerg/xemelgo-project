const express = require('express');
const router = express.Router();
const manager = require('../database/manager');

router.put('/', async function(req, res, next) {
  try {
    res.json(await manager.getUserInformation(req.body));
  } catch (err) {
    console.error(`Error while getting user information`, err.message);
    next(err);
  }
});

router.put('/employee-list', async function(req, res, next) {
  try {
    res.json(await manager.getAllEmployees(req.body));
  } catch (err) {
    console.error(`Error while getting employee list`, err.message);
    next(err);
  }
});

router.put('/worklog', async function(req, res, next) {
  try {
    const response = await manager.getWorkLog(req.body);
    res.json(response);
  } catch (err) {
    console.error(`Error while getting employee worklog`, err.message);
    next(err);
  }
});

router.post('/new-user', async function(req, res, next) {
  try {
    const response = await manager.newUser(req.body);
    res.json(response);
  } catch (err) {
    console.error(`Error while creating new user`, err.message);
    next(err);
  }
});
  
module.exports = {
    router
}