import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: "./.env" });

if (!process.env.DATABASE_URL) {
  throw new Error(
    "Missing DATABASE_URL. Please place the .env file in root folder",
  );
}

export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
