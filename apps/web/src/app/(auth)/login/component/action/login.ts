"use server";

import { compare, hash } from "bcrypt";
import { AuthPropsType } from "../module/type";
import NextAuth from "next-auth";
import { getDb } from "@/lib/drizzle";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Credentials from "next-auth/providers/credentials";
import { user } from "@repo/database";
import { eq } from "drizzle-orm";

export async function getAuth() {
  const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: DrizzleAdapter(getDb()),
    session: {
      strategy: "jwt",
    },
    providers: [
      Credentials({
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          // DBからユーザーデータを引っ張ってくる
          const person = await getDb()
            .select()
            .from(user)
            .where(eq(user.name, credentials.username as string))
            .limit(1)
            .then((res) => res[0] ?? null);

          // ユーザーが見つからない場合はnullを返す
          if (!person) {
            return null;
          }

          // パスワードの検証
          const isValidPass = await compare(
            credentials.password as string,
            person.password,
          );

          // パスワードが正しくない場合はnullを返す
          if (!isValidPass) {
            return null;
          }

          return {
            id: String(person.id),
            name: person.name,
            email: person.email,
          };
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
  });

  return { handlers, auth, signIn, signOut };
}
