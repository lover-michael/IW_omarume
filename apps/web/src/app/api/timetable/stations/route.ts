import { getStationList } from "@/server/stations/getStationList";
import { ApiBody } from "@/types/apiTypes";
import { STATION } from "@/types/formTypes";
import { NextRequest, NextResponse } from "next/server"

/**
 *
 * @param [in] request: GETしたい情報の絞り込みに利用。
 * 絞り込み条件はクエリパラメータを指定する
 * @returns
 *  - error: トランザクションの失敗があったときなどにエラーコードを返す。
 *  - jsonリスト: トランザクションに成功したとき、駅情報のリストを返す。
 */
export async function GET(request: NextRequest): Promise<NextResponse<ApiBody<STATION[]>>> {
  // クエリパラメータを抽出
  const searchPrams = request.nextUrl.searchParams;
  console.log(searchPrams.toString());
  // トランザクションの結果を格納
  let result: STATION[];

  try {
    // if (searchPrams.size === 0) {
    //   // クエリによる指定がなかったときの処理
    //   // 一旦リストをすべて取得する方針(後々絞り込み処理を入れる)
    // }
    result = await getStationList();
  } catch (error) {
    // データの取得に失敗したときの処理
    return NextResponse.json({ error: 'Internal Server Error' }, {status: 500})
  }

  return NextResponse.json({data: result},)
}
