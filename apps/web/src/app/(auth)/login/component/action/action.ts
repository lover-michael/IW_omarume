"use server";

import { db } from "@/lib/drizzle";
import { and, eq, max, or } from "drizzle-orm";
import { AuthLoginPropsType } from "../module/type";
import { user } from "@repo/database";

export async function USERDATA_POST(formData: AuthLoginPropsType) {
  // 小規模アプリのためユーザーIDの生成は簡易的
  const timestamp = new Date();
  const newUserId =
    timestamp.getTime() * 1000 + Math.floor(Math.random() * 1000);

  return await db.insert(user).values({
    id: newUserId,
    name: formData.userName,
    password: formData.password,
    email: formData.email,
  });
}

type USERDATA_PULL_PROPS = {
  id: number | null;
  name: string | null;
  email: string | null;
};
export async function USERDATA_PULL(props: USERDATA_PULL_PROPS) {
  const id = props.id === null ? 0 : props.id;
  const name = props.name === null ? "" : props.name;
  const email = props.email === null ? "" : props.email;

  if (id === 0 && name === "" && email === "") {
    return null;
  }

  return await db
    .select()
    .from(user)
    .where(
      or(
        and(eq(user.id, id)),
        and(eq(user.name, name)),
        and(eq(user.email, email)),
      ),
    );
}
