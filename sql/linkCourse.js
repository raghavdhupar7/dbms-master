const oracledb = require('oracledb');
const _ = require('lodash');

const add = `BEGIN link_course(:tid,:cid,:out);END;`

async function linkCourse(data) {
  data.out = {
    type : oracledb.NUMBER,
    dir : oracledb.BIND_OUT,
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
    let result = await connection.execute(
        add,data
      );
    return new Promise(function(resolve,reject){
      if(result.outBinds.out == 0){
        resolve(true);
      } else {
        resolve(false);
      }
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

module.exports = linkCourse;
