ALTER TABLE "timetable" DROP CONSTRAINT "arrive_station";
--> statement-breakpoint
ALTER TABLE "timetable" ADD CONSTRAINT "arrive_station" FOREIGN KEY ("arrive_station_id") REFERENCES "public"."station"("id") ON DELETE cascade ON UPDATE restrict;