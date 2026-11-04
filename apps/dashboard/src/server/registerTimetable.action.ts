import { getDB, station } from "@repo/database"
import { eq } from "drizzle-orm"

const db = getDB();

type registerProps = Omit<typeof station.$inferSelect, "id" | "create_at">

export const registerTimetable = async (props: registerProps[]) => {
  await db.insert(station).values(props);
};

type deleteProps = {
  id: number | null;
};

export const deleteTimetable = async (props: deleteProps) => {
  const timetableList = await db.select().from(station);
  // If the timetable list is empty, do nothing
  if (timetableList.length === 0) return;

  // If id is null, delete all timetable entries
  if (props.id === null) {
    await db.delete(station);
    return;
  }

  await db.delete(station).where(eq(station.id, props.id));
};
