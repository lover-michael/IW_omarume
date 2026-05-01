"use server";

import { getDb } from "@/lib/drizzle";
import { station, timetable } from "@repo/database";
import { and, eq, or } from "drizzle-orm";
import { TimeTableSchemaType } from "../module/formTypes";
import { revalidatePath } from "next/cache";
import { CandidatesStation } from "../module/class";

/**
 * @param station [0]: depart [1]: arrive
 * @param day
 * @param direction
 */
type SEARCH_STATION_OBJECT = {
  station: { name: string | null }[];
  day: string;
  direction: string;
};
const search = async (props: {
  name: string | null;
  day: string;
  direction: string;
}) => {
  return await getDb()
    .select()
    .from(station)
    .where(
      and(
        eq(station.name, props.name === null ? "" : props.name),
        eq(station.day, props.day),
        eq(station.direction, props.direction),
      ),
    );
};
/**
 * @brief マイ時刻表の保存用に利用する
 * @param target
 * @returns
 */
export async function CreateCandidates(target: SEARCH_STATION_OBJECT) {
  /// 出発駅についての候補を取得
  const departStation = await search({
    name: target.station[0].name,
    day: target.day,
    direction: target.direction,
  });
  /// 到着駅についての候補を取得
  const arriveStation = await search({
    name: target.station[1].name,
    day: target.day,
    direction: target.direction,
  });

  /// 出発駅と到着駅の候補を比較し、時刻順にソートする
  const candidates = new CandidatesStation(departStation, arriveStation)
    .sort()
    .compare().compareResult;

  /// 比較結果を返す
  return candidates;
}

export async function SaveTimeTable(props: TimeTableSchemaType) {
  const db = getDb();
  await db.insert(timetable).values(props);
  revalidatePath("/timetable");
}

/**
 * @brief 駅名の一覧を取得する
 * @returns { id: number; label: string; value: string; }[]
 */
export async function GetStations() {
  const db = getDb();
  const result = await db.select().from(station);
  const stationNames = result.map((element) => ({
    id: element.id,
    label: element.name,
    value: element.name,
  }));
  return stationNames;
}
