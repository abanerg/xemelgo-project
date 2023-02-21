const express = require('express');
const router = express.Router();
const employee = require('../database/employee')


router.put('/', async function(req, res, next) {
  try {
    res.json(await employee.getUserInformation(req.body));
  } catch (err) {
    console.error(`Error while getting employee information`, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
    try {
      res.json(await employee.pushJob(req.body));
    } catch (err) {
      console.error(`Error while pushing job`, err.message);
      next(err);
    }
  });

router.put('/clock-in', async function(req, res, next) {
  try {
    res.json(await employee.clockIn(req.body));
  } catch (err) {
    console.error(`Error while clocking`, err.message);
    next(err);
  }
});
router.put('/clock-out', async function(req, res, next) {
  try {
    res.json(await employee.clockOut(req.body));
  } catch (err) {
    console.error(`Error while clocking`, err.message);
    next(err);
  }
});


module.exports = {
    router
}