import { getDb } from "@/lib/drizzle";
import { ApiSuccess } from "@/types/apiTypes";
import { UserTimetableType } from "@/types/formTypes";
import { station, timetable } from "@repo/database";
import { and, eq, or } from "drizzle-orm";

export const GetElements = async (user_id: number) => {
  if (!user_id) return [];
  // トップのURLを取得する
  const url = process.env.NEXT_PUBLIC_API_URL;
  // /api/timetable/custom/${user_id}からデータを取得する
  const response = await fetch(
    `${url}/api/timetable/custom/${user_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-store" //App Routerではデフォルトでキャッシュされるため、最新データを確実に取得するために追加
    }
  );

  if (!response.ok) {
    // 取得失敗 => 空配列を返す
    return [];
  }

  // 取得成功 => 先頭から4つの要素を返す
  // TODO: 各ユーザーが保存できるレコード数に制限を設ける。配列をスライスして返すのは正直頭が悪い
  const body = (await response.json()) as ApiSuccess<UserTimetableType[]>;
  return body.data;
};

type ID = {
  id: number;
};

export const GetStationByID = async ({ id }: ID) => {
  // idが合致するテーブルを選択はするが、idはユニーク制約により一意に定まる(はず...)
  const result = await getDb().select().from(station).where(eq(station.id, id));
  return result[0];
};
