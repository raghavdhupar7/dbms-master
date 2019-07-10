--check this combination of feedback is available or not
create or replace procedure check_fb(teid in varchar2,stid in varchar2,c_id in varchar2,already out int)
as
any_rows_found int;
begin
already:=0;

select count(*) into any_rows_found from feedback_check where sid=stid and tid=teid and course_code=c_id;
if any_rows_found = 1 then
already:=1;
end if;
end;
/
