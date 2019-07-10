CREATE OR REPLACE PROCEDURE login(id in varchar2,password1 out varchar2,acces out int,uid1 out varchar2)
AS
	any_rows_found number;
	pass varchar2(80);
BEGIN
	SELECT count(*)
	INTO   any_rows_found
	FROM   Student
	WHERE  sid = id;

	IF any_rows_found = 1 THEN
		SELECT password INTO pass FROM student WHERE sid =id;
		password1 := pass;
		acces:=1;
		uid1:='sid';

	ELSE
		SELECT count(*)
		INTO   any_rows_found
		FROM   teacher
		WHERE  tid = id;
		IF any_rows_found = 1 THEN
		SELECT password INTO pass FROM Teacher WHERE tid =id;
			password1 := pass;
			acces:=2;
			uid1:='tid';
		ELSE
			acces := 0;
			uid1 := 'noid';
		END IF;
	END IF;
END;
/
