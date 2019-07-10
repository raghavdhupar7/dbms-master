CREATE TABLE teacher(
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
);
