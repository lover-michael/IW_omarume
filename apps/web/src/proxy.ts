import { NextResponse } from "next/server";
import { auth } from "./app/(auth)/login/component/action/login";

export const config = {
  // login以外のルートではセッションが確認されていない場合loginページにリダイレクトされる
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};

export const proxy = auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
