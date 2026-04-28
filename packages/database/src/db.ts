import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

//ビルド時に接続することを回避するため遅延評価にしている
let db: ReturnType<typeof drizzle>;

export function getDB() {
  if (!db) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    db = drizzle(pool, { schema });
  }
  return db;
}
