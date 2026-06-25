"use server";

import { auth, signIn } from "./login";

export async function loginAction(formData: FormData) {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password, redirect: false });
  } catch (error) {
    return { error: "ユーザー名またはパスワードが正しくありません" };
  }
}

export async function settionAction() {
  const session = await auth();
  return session;
}
