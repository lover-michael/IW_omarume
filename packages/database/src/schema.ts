import { sql } from "drizzle-orm";
import { timestamp, varchar } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { primaryKey, foreignKey, text } from "drizzle-orm/pg-core";
import { serial } from "drizzle-orm/pg-core";

export const passengerLogs = pgTable("passenger_logs", {
  adultCount: integer("adult_count").notNull(),
  childCount: integer("child_count").notNull(),
  createdAt: timestamp("create_at").defaultNow().notNull(),
  // 駅名も記録する？
});
export const timetable = pgTable(
  "timetable",
  {
    id: serial("id").primaryKey(),
    create_at: timestamp("create_at").defaultNow().notNull(),
    memo: varchar("memo"),
    depart_station_id: integer("depart_station_id").notNull(), //出発駅の情報を外部キーで取得
    arrive_station_id: integer("arrive_station_id").notNull(), //到着駅の情報を外部キーで取得
  },
  (table) => ({
    departStationFK: foreignKey({
      name: "depart_station",
      columns: [table.depart_station_id],
      foreignColumns: [station.id],
    })
      .onDelete("cascade")
      .onUpdate("restrict"),

    arriveStationFK: foreignKey({
      name: "arrive_station",
      columns: [table.arrive_station_id],
      foreignColumns: [station.id],
    })
      .onDelete("cascade")
      .onUpdate("restrict"),
  }),
);

export const station = pgTable("station", {
  id: serial("id").primaryKey().notNull(),
  create_at: timestamp("create_at").defaultNow().notNull(),
  name: varchar("name").notNull(),
  day: varchar("day").notNull(),
  hour: varchar("hour").notNull(),
  minute: varchar("minute").notNull(),
  direction: varchar("direction").notNull(),
});

/*ユーザーの登録情報 */
export const user = pgTable("user", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 16 }).notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
});

export const accounts = pgTable(
  "accounts",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    type: text("type").notNull(), // "oauth" | "email" | "credentials"
    provider: text("provider").notNull(), // "github" | "google" など
    providerAccountId: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"), // nullable
    access_token: text("access_token"), // nullable
    expires_at: integer("expires_at"), // nullable
    token_type: text("token_type"), // nullable
    scope: text("scope"), // nullable
    id_token: text("id_token"), // nullable
    session_state: text("session_state"), // nullable
  },
  (account) => ({
    primaryKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expires: timestamp("expires").notNull(),
});
