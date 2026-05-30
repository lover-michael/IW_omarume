CREATE TABLE "station" (
	"id" serial PRIMARY KEY NOT NULL,
	"create_at" timestamp DEFAULT now() NOT NULL,
	"name" varchar NOT NULL,
	"day" varchar NOT NULL,
	"time" varchar NOT NULL,
	"direction" varchar NOT NULL
);
