import { NextResponse } from "next/server";

// apiレスポンスの型定義
// レスポンスの型をチェックするために使用
export type ApiSuccess<T> = { data: T };
export type ApiError = { error: string };
export type ApiBody<T> = ApiSuccess<T> | ApiError;
