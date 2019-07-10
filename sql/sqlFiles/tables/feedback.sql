CREATE TABLE feedback(
  feedback_id  int NOT NULL,
  rating_A int,
  rating_B int,rating_C int,
  comment_A varchar(100),
  comment_B varchar(100),
  check(rating_A>=0 AND rating_A<=5),
  check(rating_B>=0 AND rating_B<=5),
  check(rating_C>=0 AND rating_C<=5),
  primary key(feedback_id)
);

CREATE SEQUENCE feedback_id minvalue 1 start with 1 cache 20;
