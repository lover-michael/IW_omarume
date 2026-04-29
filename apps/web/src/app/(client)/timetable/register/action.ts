"use server";

import { getDb } from "@/lib/drizzle";
import { station, timetable } from "@repo/database";
import { and, eq, or } from "drizzle-orm";
import { TimeTableSchemaType } from "../module/formTypes";
import { revalidatePath } from "next/cache";

type SEARCH_STATION_OBJECT = {
  name: string | null;
  day: string;
  hour: string | null;
  minute: string | null;
  direction: string;
};

/**
 * @brief マイ時刻表の保存用に利用する
 * @param target
 * @returns
 */
export async function GetIDfromStations(target: SEARCH_STATION_OBJECT) {
  // サブクエリ作成
  const sq = getDb()
    .$with("sq")
    .as(
      getDb()
        .select()
        .from(station)
        .where(
          and(
            eq(station.day, target.day),
            eq(station.direction, target.direction),
          ),
        ),
    );

  const result =
    target.name === null
      ? await getDb().with(sq).select().from(sq)
      : await getDb()
          .with(sq)
          .select()
          .from(sq)
          .where(eq(station.name, target.name));

  if (target.hour === null && target.minute === null) {
    // IDのみを配列にして返す
    return result.map((element) => element.id);
  }

  return result
    .filter(
      (element) =>
        Number(element.hour) === Number(target.hour) ||
        Number(element.minute) === Number(target.minute),
    )
    .map((element) => element.id);
}

export async function SaveTimeTable(props: TimeTableSchemaType) {
  const db = getDb();
  await db.insert(timetable).values(props);
  revalidatePath("/timetable");
}

export async function GetStations() {
  const db = getDb();
  const result = await db.select().from(station);
  const stationNames = result.map((element) => ({
    label: element.name,
    value: element.name,
  }));
  return stationNames;
}
