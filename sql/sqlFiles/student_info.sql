CREATE OR REPLACE PROCEDURE student_info(uid1 in varchar2,fname out varchar,
lname out  varchar,Br out varchar,cno out varchar,Deg  out varchar,Db out  varchar,jyear out number)
AS
BEGIN
SELECT first_name,last_name,branch ,contact_no ,degree ,dob ,joining_year INTO fname ,lname ,Br,cno,Deg,Db,jyear FROM student WHERE sid=uid1;
END;
/
