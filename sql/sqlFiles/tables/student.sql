CREATE TABLE student(
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
);
