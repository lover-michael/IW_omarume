import { getDb } from "@/lib/drizzle";
import { station } from "@repo/database";

export const getStationList = async () => {
  // aliasの設定
  const db = getDb();
  // 駅情報を全て返す
  return await db.select().from(station);
}
