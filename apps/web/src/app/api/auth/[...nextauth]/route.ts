import { auth, handlers } from "@/app/(auth)/login/component/action/login";
import { NextRequest, NextResponse } from "next/server";
export const { POST } = handlers;

export const GET = auth(async ({ auth }) => {
  return NextResponse.json({ user: auth?.user });
});
