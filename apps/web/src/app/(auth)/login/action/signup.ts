"use server";

import { AuthPropsType } from "../types/authTypes";
import { USERDATA_POST, USERDATA_PULL } from "./action";

export const signup = async (props: AuthPropsType): Promise<number | null> => {
  // ユーザーデータを取得し、存在しない場合は新規作成
  const result = await USERDATA_PULL({
    id: null,
    name: props.userName,
    email: props.email,
  });

  if (result.length === 0) {
    // DBに新規データをポスト
    return await USERDATA_POST(props);
  } else if (result === "noValue") {
    // ユーザーデータが既に存在する場合は何もしない
    return null;
  } else {
    return null;
  }
};
