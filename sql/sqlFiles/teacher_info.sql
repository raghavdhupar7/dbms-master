CREATE OR REPLACE PROCEDURE teacher_info(uid1 in varchar2,fname out varchar,
lname out  varchar,des out varchar,dept out varchar,eid  out varchar,cno out  varchar,db out varchar2 ,jyear out number)
AS
BEGIN
SELECT first_name,last_name,designation ,dept ,Email_id,contact_no ,Dob,joining_year INTO fname ,lname ,des,dept,eid,cno,db,
jyear FROM teacher WHERE tid=uid1;
END;
/
