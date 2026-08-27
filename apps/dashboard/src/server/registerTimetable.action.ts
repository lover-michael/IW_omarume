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
  await db.transaction(async (tx) => {
    const timetableList = await tx.select().from(station);
    // If the timetable list is empty, do nothing
    if (timetableList.length === 0) return;

    // If id is null, delete all timetable entries
    if (props.id === null) {
      await tx.delete(station);
      return;
    }

    await tx.delete(station).where(eq(station.id, props.id));
  })
};
