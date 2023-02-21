const db = require('./db');
const helper = require('./helper');

async function getUserInformation(body){
  const data = await db.query(`
    SELECT employee_name, employee_surname 
    FROM users WHERE employee_id=${body.employee_id}
  `);
  const rows = helper.emptyOrRows(data);
  return rows;
}

async function getAllEmployees() {
  const ret = [];
  const ids = await db.query(`
   SELECT employee_id FROM logins WHERE employee_manstatus=0
  `);
  const data = JSON.parse(JSON.stringify(ids))
  for (var i = 0; i < data.length; i++) {
    ret.push(await db.query(`
    SELECT employee_id, employee_name, employee_surname 
    FROM users WHERE employee_id=${data[i].employee_id}
    `))
  }
  const rows = helper.emptyOrRows(ret);
  return rows; 
}

async function getWorkLog(body) {
  const ret = [];
  const timesheet = await db.query(`
  SELECT * FROM timesheet WHERE 
  employee_id=${body.employee_id} AND employee_date='${body.employee_date}'
  `);
  const jobs = await db.query(`
  SELECT job_number, job_start, job_end FROM jobs WHERE employee_id=${body.employee_id} and job_date='${body.employee_date}'
`);
  ret.push(timesheet);
  ret.push(jobs);
  const rows = helper.emptyOrRows(ret);
  return rows; 
}

async function newUser(body) {
  let message = "Error adding new user.";
  const resp1 = await db.query(`
    INSERT INTO logins VALUES ('${body.employee_username}','${body.employee_password}',${body.employee_manstatus})
  `);
  if (resp1.affectedRows) {
      const id = await db.query(`
      SELECT employee_id FROM logins where employee_username='${body.employee_username}'
    `)
    
    const resp2 = await db.query(`
      INSERT INTO log
    `);
    if (resp2.affectedRows) {
      message = "New user added succesfully."
    }
  }
  
  
  
  return {message};
}

module.exports = {
  getUserInformation,
  getAllEmployees,
  getWorkLog,
  newUser
}