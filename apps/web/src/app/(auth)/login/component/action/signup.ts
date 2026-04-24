"use server";

import { AuthLoginPropsType } from "../module/type";
import { USERDATA_POST, USERDATA_PULL } from "./action";

export const signup = async (
  props: AuthLoginPropsType,
): Promise<number | null> => {
  // ユーザーデータを取得し、存在しない場合は新規作成
  const result = await USERDATA_PULL({
    id: null,
    name: props.userName,
    email: props.email,
  });

  if (result !== null && result.length === 0) {
    // DBに新規データをポスト
    return await USERDATA_POST(props);
  } else {
    // ユーザーデータが既に存在する場合は何もしない
    return null;
  }
};
