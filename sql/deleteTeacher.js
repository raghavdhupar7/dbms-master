const oracledb = require('oracledb');
const _ = require('lodash');

const commands = [
  `DELETE FROM teacher WHERE tid= :id`,
]

async function deleteTeacher(id) {

  const data = {
    id : id
  }
  let connection;

  try {
    connection = await oracledb.getConnection(  {
      user          : process.env.DB_USER,
      password      : process.env.DB_PASSWORD,
      connectString : process.env.DB_STRING
    });
    oracledb.autoCommit = true;
    for(const query of commands ){
      let result = await connection.execute(
        query,data
      );
    }
    return new Promise(function(resolve,reject){
      resolve(true);
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

module.exports = deleteTeacher;
