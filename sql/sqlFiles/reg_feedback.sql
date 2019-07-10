create or replace procedure reg_feedback(teid in varchar2,stid in varchar2,c_id in varchar2,Rating_A in int,Rating_B in int ,Rating_C in int ,Comment_A in varchar,Comment_B in varchar2)
as
begin
insert into feedback_check values(Feedback_id_c.nextval,stid,teid,c_id);
insert into Feedback values(feedback_id.nextval,Rating_A,Rating_B,Rating_C ,Comment_A,Comment_B);
end;
/
