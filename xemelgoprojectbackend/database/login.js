const db = require('./db');
const helper = require('./helper');

async function getPasswordHash(body){
  const rows = await db.query(
    `SELECT employee_password, employee_manstatus, employee_id
    FROM logins WHERE employee_username='${body.employee_username}'`
  );
  const data = helper.emptyOrRows(rows);
  
  return data;
}


module.exports = {
  getPasswordHash
}