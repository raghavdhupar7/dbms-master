create or replace procedure link_course(id in varchar2,c_code in varchar2,already out int)
as
c_name varchar2(100);
begin
already:=0;
select Course_name into c_name from course where course_code=c_code;
insert into teacher_course values(id,c_code,c_name);
EXCEPTION
		when dup_val_on_index then
		already:=1;
end;
/
