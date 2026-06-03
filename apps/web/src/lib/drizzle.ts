import * as schemas from "@repo/database";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// ビルド時に接続することを回避するため遅延評価にしている
let _db: ReturnType<typeof drizzle>;

export function getDb() {
  if (!_db) {
    _db = drizzle(neon(process.env.DATABASE_URL!), {
      schema: {
        ...schemas,
      },
    });
  }
  return _db;
}
