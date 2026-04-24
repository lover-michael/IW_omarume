'use server';

import { db } from '@/lib/drizzle';
import { station, timetable } from '@repo/database';
import { and, eq, or } from 'drizzle-orm';

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
  const sq = db.$with('sq').as(db
        .select()
        .from(station)
        .where(and(
          eq(station.day, target.day),
          eq(station.direction, target.direction)
        )));
  
  const result = target.name === null 
    ? await db.with(sq).select().from(sq) 
    : await db.with(sq).select().from(sq).where(eq(station.name, target.name));
  
  if(target.hour === null && target.minute === null)
  {
    // IDのみを配列にして返す
    return result.map((element) => element.id);
  }

  return result.filter((element) => (
    Number(element.hour) === Number(target.hour) || Number(element.minute) === Number(target.minute)
  )).map((element) => element.id);
}
