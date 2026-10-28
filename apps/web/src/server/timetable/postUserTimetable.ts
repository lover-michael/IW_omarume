import { getDb } from "@/lib/drizzle";
import { timetable } from "@repo/database";

type propsType = {
  memo?: string,
  departStationId: number,
  arriveStationId: number,
  userId: number,
}

export const postUserTimetable = async ({ memo, userId, departStationId, arriveStationId }: propsType) => {
  const db = getDb();
  // DBにマイ時刻表のレコードを追加
  await db.transaction(async (tx) => {
    tx.insert(timetable).values({
      memo: memo,
      userId: userId,
      depart_station_id: departStationId,
      arrive_station_id: arriveStationId
    })
  })
}
