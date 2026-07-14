"use server";
import { getDb } from "@/lib/drizzle";
import { station, timetable } from "@repo/database";
import { and, eq, or } from "drizzle-orm";

export const GetElements = async (user_id: number) => {
  return await getDb()
    .select()
    .from(timetable)
    .where(eq(timetable.userId, user_id))
    .limit(4);
};

type ID = {
  id: number;
};

export const GetStationByID = async ({ id }: ID) => {
  // idが合致するテーブルを選択はするが、idはユニーク制約により一意に定まる(はず...)
  const result = await getDb().select().from(station).where(eq(station.id, id));
  return result[0];
};
