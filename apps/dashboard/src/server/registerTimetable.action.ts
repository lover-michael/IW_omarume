import { getDB, station } from "@repo/database"

const db = getDB();

type registerProps = Omit<typeof station.$inferSelect, "id" | "create_at">

export const registerTimetable = async (props: registerProps[]) => {
  await db.insert(station).values(props);
};
