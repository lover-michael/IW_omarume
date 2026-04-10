ALTER TABLE "station" ADD COLUMN "hour" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "station" ADD COLUMN "minute" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "station" DROP COLUMN "time";