const oracledb = require('oracledb');
const _ = require('lodash');

const commands = [
  `select * from feedback_check where tid = :tid and course_code = :cid`,
  `select * from feedback_check where course_code = :cid`,
  `select * from feedback_check where tid = :tid`,
  `select Rating_A ,Rating_B,Rating_C,Comment_A,Comment_B from feedback where Feedback_id = :id`
]

async function registerFeedbackEngine(data) {

  let connection;

  try {
    connection = await oracledb.getConnection(  {
      user          : process.env.DB_USER,
      password      : process.env.DB_PASSWORD,
      connectString : process.env.DB_STRING
    });
    oracledb.autoCommit = true;
    var mid = [];
    var final = [];
    var result;
    if('tid' in data && 'cid' in data){
      result = await connection.execute(
        commands[0],data
      );
    } else if('tid' in data) {
      result = await connection.execute(
        commands[2],data
      );
    } else {
      result = await connection.execute(
        commands[1],data
      );
    }
      for(const row of result.rows){
        mid.push({
          id : row[0],
          tid : row[2],
          cid : row[3]
        });
      }
      for (const params of mid){
        let param = {
          id : params.id
        }
        result = await connection.execute(
          commands[3],param
        );
        final.push(_.zipObject(_.map(result.metaData,'name'),result.rows[0]));
        final[final.length-1].TID = params.tid;
        final[final.length-1].CID = params.cid;
      }
    return new Promise(function(resolve,reject){
      resolve(final);
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

module.exports = registerFeedbackEngine;
