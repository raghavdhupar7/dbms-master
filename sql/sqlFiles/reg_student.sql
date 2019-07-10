CREATE OR REPLACE PROCEDURE reg_student(sid1 in varchar2,pass in varchar2,fname in varchar,
lname in  varchar,Br in varchar,cno in varchar,Deg  in varchar,Db in  varchar,jyear in number,already out int)
AS

BEGIN
INSERT INTO student VALUES(sid1 ,fname ,lname ,Br,pass,cno ,Deg ,Db,jyear);
already:=0;
	EXCEPTION
		WHEN dup_val_on_index THEN
		already:=1;
		WHEN others THEN
		already:=1;

END;
/
