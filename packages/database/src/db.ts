import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

//ビルド時に接続することを回避するため遅延評価にしている
let db: ReturnType<typeof drizzle>;

export function getDB() {
  if (!db) {
    const pool = neon(process.env.DATABASE_URL!);
    db = drizzle(pool, { schema });
  }
  return db;
}
