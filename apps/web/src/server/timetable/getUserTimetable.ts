import { getDb } from "@/lib/drizzle"
import { timetable } from "@repo/database";
import { eq } from "drizzle-orm";

export const getUserTimetable = async ({ userId }: { userId: number }) => {
  const db = getDb();
  return await db.select().from(timetable).where(eq(timetable.userId, userId)).limit(10);
}
