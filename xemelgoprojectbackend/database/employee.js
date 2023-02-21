const db = require('./db');
const helper = require('./helper');
const config = require('./config');

async function getUserInformation(body){
  const initCheck = await db.query(`
    SELECT employee_id FROM timesheet WHERE 
    employee_id=${body.employee_id} AND employee_date='${body.employee_date}'
  `);
  const checkRows = helper.emptyOrRows(initCheck);
  if (checkRows.length == 0) {
    await db.query(`
    INSERT INTO timesheet VALUES (${body.employee_id},'${body.employee_date}',NULL,NULL)
  `);
  }
  const data = await db.query(`
    SELECT employee_name, employee_surname 
    FROM users WHERE employee_id=${body.employee_id}
  `);
  const rows = helper.emptyOrRows(data);
  return rows
}

async function pushJob(body) {
    const data = await db.query(`
    INSERT INTO jobs VALUES (${body.employee_id},${body.job_number},'${body.job_date}','${body.job_start}','${body.job_end}')
    `);
    let message = 'Error in pushing job';

    if (data.affectedRows) {
        message = 'Job pushed succesfully';
    }
    
    return {message};
}

async function clockIn(body) {
    const data = await db.query(`
        UPDATE timesheet SET employee_clock_in='${body.employee_clock_in}' WHERE 
        employee_id=${body.employee_id} AND employee_date='${body.employee_date}'
    `);
    let message = 'Error in clocking in';
    if (data.affectedRows) {
        message = 'Clocked in sucessfully';       
    }
        
    return {message};
}

async function clockOut(body) {
    const data = await db.query(`
        UPDATE timesheet SET employee_clock_out='${body.employee_clock_out}' WHERE 
        employee_id=${body.employee_id} AND employee_date='${body.employee_date}'
    `);
    let message = 'Error in clocking out';
    if (data.affectedRows) {
        message = 'Clocked out sucessfully';
    }
        
    return {message};
}

module.exports = {
  getUserInformation
,
  pushJob,
  clockIn,
  clockOut
}