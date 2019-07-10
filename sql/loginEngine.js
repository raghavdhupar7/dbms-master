const oracledb = require('oracledb');
const bcrypt = require('bcryptjs');

const log = `BEGIN login(:id,:password,:access,:uid);END;`

var getData = require('./getData');

async function registerStudentEngine(data,pass) {
  data.password = { type: oracledb.STRING, dir: oracledb.BIND_OUT,value : 'undefined'};
  data.access = { type: oracledb.NUMBER, dir: oracledb.BIND_OUT,value : 0};
  data.uid = { type: oracledb.STRING, dir: oracledb.BIND_OUT,value : 'noid'};
  let connection;

  try {
    connection = await oracledb.getConnection(  {
      user          : process.env.DB_USER,
      password      : process.env.DB_PASSWORD,
      connectString : process.env.DB_STRING
    });
    oracledb.autoCommit = true;

      let result = await connection.execute(
        log,data
      );
      return new Promise(function(resolve,reject){
          if(result.outBinds.access == 0){
            resolve(undefined);
          } else {
            bcrypt.compare(pass,result.outBinds.password,function(err,res){
              if(err){
                console.log(err);
              } else {
                if(res){
                  data = {
                    id : data.id
                  }
                  getData(result.outBinds,data).then((result)=>{
                    resolve(result);
                  });
                } else {
                  resolve(undefined);
                }
              }
            });
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

module.exports = registerStudentEngine;
