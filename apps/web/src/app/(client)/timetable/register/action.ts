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
  const candidates = new CandidatesStation(departStation, arriveStation);

  /// 比較結果を返す
  return candidates.sort().compare().compareResult;
}

export async function SaveTimeTable(props: TimeTableSchemaType) {
  const db = getDb();
  await db.insert(timetable).values({
    memo: props.memo,
    depart_station_id: props.stations.depart_station_id,
    arrive_station_id: props.stations.arrive_station_id,
    userId: props.user_id,
  });
}

/**
 * @brief 駅名の一覧を取得する
 * @returns { id: number; label: string; value: string; }[]
 */
export async function GetStations() {
  const db = getDb();
  // stationのnameを重複なく取得(今回の書き方はpostgre用の書き方)
  const result = await db
    .selectDistinctOn([station.name])
    .from(station)
    .orderBy(station.name);

  const stationNames = result.map((element) => ({
    id: element.id,
    label: element.name,
    value: element.name,
  }));
  return stationNames;
}

export async function DeleteTimeTable(id: number) {
  const db = getDb();
  await db.delete(timetable).where(eq(timetable.id, id));
}
