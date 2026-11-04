import { getDB, station } from "@repo/database"

export const GetStationList = async () => {
  const db = getDB();
  return await db.select().from(station);
}
