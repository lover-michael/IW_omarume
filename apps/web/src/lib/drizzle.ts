import * as schemas from "@repo/database";
import { drizzle } from "drizzle-orm/node-postgres";

// ビルド時に接続することを回避するため遅延評価にしている
let _db: ReturnType<typeof drizzle>;

export function getDb() {
  if (!_db) {
    _db = drizzle({
      connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: false,
      },
      schema: {
        ...schemas,
      },
    });
  }
  return _db;
}
