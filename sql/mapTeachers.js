const oracledb = require('oracledb');
const _ = require('lodash');

const mapCourse = require('./mapCourse');

const teacher = `SELECT tid,first_name,last_name from teacher`;

async function mapTeachers(){
  let connection;

  try {
    connection = await oracledb.getConnection(  {
      user          : process.env.DB_USER,
      password      : process.env.DB_PASSWORD,
      connectString : process.env.DB_STRING
    });
    oracledb.autoCommit = true;
      let result = await connection.execute(
        teacher
      );
      var data = [];
      const n = result.rows.length;
      for ( i = 0 ; i < n;i++){
        data.push(_.zipObject(_.map(result.metaData,'name'),result.rows[i]));
      }
    return new Promise((resolve,reject)=>{
      mapCourse(data).then((result)=>{
        resolve(result);
      });
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

module.exports = mapTeachers;
