CREATE TABLE feedback_check(
  Feedback_id_c int not null,
  sid varchar (40),
  tid varchar(40),
  Course_code varchar(60),
  primary key(sid,tid,course_code)
);
create sequence Feedback_id_c minvalue 1 start with 1 cache 20;
