const oracledb = require('oracledb');
const _ = require('lodash');

const stu = `SELECT * FROM course where sid = :id`
const tec = `SELECT * FROM teacher where tid = :id`

async function getData(outBinds,data) {
  query = {
    id : data.id
  }
  let connection;

  try {
    connection = await oracledb.getConnection(  {
      user          : process.env.DB_USER,
      password      : process.env.DB_PASSWORD,
      connectString : process.env.DB_STRING
    });
    oracledb.autoCommit = true;
    var dat;
    if(outBinds.uid == 'sid'){
      result = await connection.execute(
        stu,query
      );
    } else {
      result = await connection.execute(
        tec,query
      );
    }
    return new Promise(function(resolve,reject){
      resolve(result);
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports = getData;
