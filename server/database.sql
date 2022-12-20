CREATE TABLE "Koalas" (
	"id" serial primary key,
	"name" varchar,
	"gender" varchar,
	"age" integer,
	"ready_to_transfer" varchar,
	"notes" varchar
);

SELECT * FROM "Koalas";

INSERT INTO "Koalas" ("name", "gender", "age", "ready_to_transfer", "notes")
VALUES ('Bruce', 'm', 12, 'y', 'yup');