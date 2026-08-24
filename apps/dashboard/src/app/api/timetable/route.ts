import { NextRequest, NextResponse } from "next/server";
import { Station } from "@/types/timetableTypes";
import { registerTimetable } from "@/server/registerTimetable.action";

// バス全体の時刻表をアップロードするときなどに利用するAPIエンドポイント
export async function POST(request: NextRequest, response: NextResponse) {
  // リクエストボディ
  let body;
  try {
    // JSONのパース処理の監視
    body = await request.json();
  } catch (error) {
    // JSONのパースに失敗した場合のエラーハンドリング
    return NextResponse.json({ error: `${error}` }, { status: 400 });
  }

  const data: Station[] = body;
  /*以下にDB操作用の処理を記述(APIとして利用できるかのテストのために一旦保留)*/
  try {
    // 時刻表データをDBに登録
    await registerTimetable(data);
  } catch (error) {
    // データ登録中にエラーが発生した場合のエラーハンドリング
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }

  // リクエスト成功のレスポンスを返す
  return NextResponse.json({ message: "success" }, { status: 200 });
}
