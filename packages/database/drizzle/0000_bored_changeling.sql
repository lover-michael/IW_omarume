CREATE TABLE "passenger_logs" (
	"adult_count" integer NOT NULL,
	"child_count" integer NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "timetable" (
	"id" serial PRIMARY KEY NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"memo" varchar,
	"day" varchar,
	"from" varchar,
	"to" varchar,
	"time_depart" varchar,
	"time_arrive" varchar
);
