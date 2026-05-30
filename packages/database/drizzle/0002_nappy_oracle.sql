ALTER TABLE "timetable" ADD COLUMN "station_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "timetable" ADD CONSTRAINT "depart_station" FOREIGN KEY ("station_id") REFERENCES "public"."station"("id") ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "timetable" DROP COLUMN "day";--> statement-breakpoint
ALTER TABLE "timetable" DROP COLUMN "from";--> statement-breakpoint
ALTER TABLE "timetable" DROP COLUMN "to";--> statement-breakpoint
ALTER TABLE "timetable" DROP COLUMN "time_depart";--> statement-breakpoint
ALTER TABLE "timetable" DROP COLUMN "time_arrive";