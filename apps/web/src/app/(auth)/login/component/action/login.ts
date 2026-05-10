"use server";

import { hash } from "bcrypt";
import { AuthPropsType } from "../module/type";

/// Formのサブミット時に呼び出される関数
export const onSubmit = async (props: AuthPropsType) => {
  const userData = {
    userName: props.userName,
    email: props.email, //
    password: await hash(props.password, 10), // パスワードをハッシュ化
  };

  console.log("submit");
};
