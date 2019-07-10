const oracledb = require('oracledb');
const _ = require('lodash');

const course = `SELECT course_code,course_name from teacher_course where tid = :id`;

async function mapCourse(data){
  let connection;

  try {
    connection = await oracledb.getConnection(  {
      user          : process.env.DB_USER,
      password      : process.env.DB_PASSWORD,
      connectString : process.env.DB_STRING
    });
    oracledb.autoCommit = true;
    for(const ob of data){
      params = {
        id : ob.TID
      }
      let result = await connection.execute(
        course,params
      );
      const n = result.rows.length;
      ob.courses = [];
      for ( i = 0 ; i < n;i++){
        ob.courses.push(_.zipObject(_.map(result.metaData,'name'),result.rows[i]));
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

module.exports = mapCourse;
