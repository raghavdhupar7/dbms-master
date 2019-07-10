const oracledb = require('oracledb');

const commands = [
  `BEGIN reg_teacher(:id,:password,:firstname,:lastname,:designation,:department,:email,:contact,:dob,:joining,:output);END;`
]

async function registerStudentEngine(data) {

  data.output = { type: oracledb.NUMBER, dir: oracledb.BIND_OUT,value : 12};
  let connection;

  try {
    connection = await oracledb.getConnection(  {
      user          : process.env.DB_USER,
      password      : process.env.DB_PASSWORD,
      connectString : process.env.DB_STRING
    });
    oracledb.autoCommit = true;

    for (const query of commands){
      let result = await connection.execute(
        query,data
      );
      return new Promise(function(resolve,reject){
        resolve(result.outBinds);
      });
    }

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

module.exports = registerStudentEngine;
