ALTER TABLE "timetable" DROP CONSTRAINT "depart_station";
--> statement-breakpoint
ALTER TABLE "timetable" ADD COLUMN "depart_station_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "timetable" ADD COLUMN "arrive_station_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "timetable" ADD CONSTRAINT "arrive_station" FOREIGN KEY ("depart_station_id") REFERENCES "public"."station"("id") ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "timetable" ADD CONSTRAINT "depart_station" FOREIGN KEY ("depart_station_id") REFERENCES "public"."station"("id") ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "timetable" DROP COLUMN "station_id";