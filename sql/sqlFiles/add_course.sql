create or replace procedure add_course(c_code in varchar2,c_name in varchar2,sess in varchar2,ltp in varchar2,credits in int,already out int)
as
begin
already:=0;
insert into course values(c_code,c_name,sess,ltp,credits);
EXCEPTION
		when dup_val_on_index then
		already:=1;
end;
/
