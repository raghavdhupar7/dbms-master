CREATE OR REPLACE PROCEDURE reg_teacher(uid1 in varchar2,pass in varchar2,fname in varchar2,
lname in  varchar2,des in varchar2,dept in varchar2,eid in varchar2,cno in  varchar2,db in varchar2 ,jyear in number,already out int)
AS
BEGIN
INSERT INTO teacher VALUES(uid1,fname,lname ,des ,dept,eid ,pass,cno,db ,jyear);
already:=0;
	EXCEPTION
		WHEN dup_val_on_index THEN
		already:=1;
		WHEN others THEN
		already:=1;

END;
/
