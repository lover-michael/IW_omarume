import { NextRequest, NextResponse } from "next/server";
import { Station } from "@/types/timetableTypes";

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

  // // リクエストボディの型チェック
  // const checkType = (body: unknown): body is Station[] => {
  //   return typeof body === "object" && body !== null && "name" in body;
  // };
  // // リクエストボディの型がStationでない場合はエラーを返す
  // if(!checkType(body)) {
  //   return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  // }

  const data: Station[] = body;
  /*以下にDB操作用の処理を記述(APIとして利用できるかのテストのために一旦保留)*/

  // リクエスト成功のレスポンスを返す
  return NextResponse.json({ message: "success" }, { status: 200 });
}
