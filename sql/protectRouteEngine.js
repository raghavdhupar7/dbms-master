const oracledb = require('oracledb');

const commands = [
  `BEGIN check_fb(:tid,:sid,:cid,:out);END;`
]

async function registerFeedbackEngine(data) {

  data.out = {
    type : oracledb.NUMBER,
    dir: oracledb.BIND_OUT,
    value : 0
  }

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
        if(result.outBinds.out == 0){
          resolve(true);
        } else {
          resolve(false);
        }
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

module.exports = registerFeedbackEngine;
