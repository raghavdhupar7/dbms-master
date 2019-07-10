var oracledb = require('oracledb');

const commands = [
  `CREATE TABLE student(
    sid varchar(40),
    first_name varchar(50) not null,
    last_name varchar(60) not null,
    branch varchar(60) not null,
    password varchar(100),
    contact_no varchar(10),
    degree varchar(60) not null,
    dob varchar(60),
    joining_year number not null,
    primary key(sid)
  )`,
  `CREATE TABLE teacher(
    tid varchar(40),
    first_name varchar(40) not null,
    last_name varchar(60) not null,
    designation varchar(50),
    dept varchar(40),
    email_id varchar(60),
    password varchar(100),
    contact_no varchar(10),
    dob varchar(60),
    joining_year number not null,
    PRIMARY KEY(tid)
  )`,
  `CREATE TABLE teacher_course(
    tid varchar(60),
    course_code varchar(60),
    course_name varchar(60)
  )`,
  `CREATE TABLE feedback(
    feedback_id  int NOT NULL,
    rating_A int,
    rating_B int,rating_C int,
    comment_A varchar(100),
    comment_B varchar(100),
    check(rating_A>=0 AND rating_A<=5),
    check(rating_B>=0 AND rating_B<=5),
    check(rating_C>=0 AND rating_C<=5),
    primary key(feedback_id)
  )`,
  `CREATE SEQUENCE feedback_id minvalue 1 start with 1 cache 20`,
  `CREATE TABLE course(
    course_code varchar(60),
    course_name varchar(69) not null,
    sesion varchar(60),
    L_T_P varchar(20),
    credit number,
    primary key(course_code)
  )`,
  `CREATE TABLE feedback_check(
    Feedback_id_c int not null,
    sid varchar (40),
    tid varchar(40),
    Course_code varchar(60),
    primary key(sid,tid,course_code)
  )`,
  `create sequence Feedback_id_c minvalue 1 start with 1 cache 20`
]

async function createTable() {

  let connection;

  try {
    connection = await oracledb.getConnection(  {
      user          : process.env.DB_USER,
      password      : process.env.DB_PASSWORD,
      connectString : process.env.DB_STRING
    });
    for (const query of commands){
      let result = await connection.execute(
        query
      );
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

module.exports = createTable;
