const oracledb = require('oracledb');
const _ = require('lodash');

const commands = [
  `SELECT * FROM course`,
  `select * from teacher`,
  `select * from student`
]

async function adminEngine() {

  let connection;

  try {
    connection = await oracledb.getConnection(  {
      user          : process.env.DB_USER,
      password      : process.env.DB_PASSWORD,
      connectString : process.env.DB_STRING
    });
    oracledb.autoCommit = true;
    var data = {
      students : [],
      teachers : [],
      courses : []
    }
    for(const query of commands ){
      let result = await connection.execute(
        query
      );
      if(_.indexOf(commands,query) == 0){
        for(const row of result.rows){
          data.courses.push(_.zipObject(_.map(result.metaData,'name'),row));
        }
      } else if(_.indexOf(commands,query) == 1){
        for(const row of result.rows){
          data.teachers.push(_.zipObject(_.map(result.metaData,'name'),row));
        }
      } else {
        for(const row of result.rows){
          data.students.push(_.zipObject(_.map(result.metaData,'name'),row));
        }
      }
    }
    return new Promise(function(resolve,reject){
      resolve(data);
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

module.exports = adminEngine;
