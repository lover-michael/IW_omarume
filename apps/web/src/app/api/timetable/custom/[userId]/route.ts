import { getUserTimetable } from "@/server/timetable/getUserTimetable";
import { postUserTimetable } from "@/server/timetable/postUserTimetable";
import { UserTimetableType } from "@/types/formTypes";
import { NextRequest, NextResponse } from "next/server";
import { ApiBody } from "@/types/apiTypes";

type RequestType = {
  memo?: string,
  departStationId: number,
  arriveStationId: number,
}

// export async function POST(
//   request: NextRequest,
//   { param }: { param: Promise<{ userId: string }> }
// ) {
//   // ポストするデータをリクエストボディから受け取る
//   const postData: RequestType = await request.json();
//   // 動的セグメントからユーザーidを受け取る
//   const userId = Number((await param).userId);
//
//   // ユーザーのリクエストデータをDBに追加する
//   try {
//     await postUserTimetable({
//       userId: userId,
//       ...postData
//     })
//   } catch (error) {
//     // データ登録のトランザクションに失敗した場合、エラーコードを返す
//     return NextResponse.json({ error: `${error}` }, { status: 500 });
//   }
//
//   // リクエスト成功レスポンスを返す
//   return NextResponse.json({ message: "success" }, { status: 200 });
// }

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }>; }
): Promise<NextResponse<ApiBody<UserTimetableType[]>>> {
  // 動的セグメントからユーザーidを受け取る
  const { userId } = await params;
  const id = Number(userId)
  // トランザクションからの結果を受け取る
  let result: UserTimetableType[];

  try {
    result = await getUserTimetable({ userId: id });
  } catch (error) {
    // データ取得に失敗した場合のエラーを返す
    console.log(error);
    return NextResponse.json({ error:  "Internal Server Error" }, {status: 500})
  }
  // DBから取得したレコードの配列を返す
  return NextResponse.json({data: result}, {status: 200});
}
