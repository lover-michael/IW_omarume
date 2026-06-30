ALTER TABLE "accounts" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "timetable" ADD COLUMN "user_id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "timetable" ADD CONSTRAINT "user_id" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE restrict;