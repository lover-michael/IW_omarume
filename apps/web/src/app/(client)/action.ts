"use server";
import { getDb } from "@/lib/drizzle";
import { z } from "zod";
import { userSchema } from "./[userId]/timetable/userSchema";
import { station, timetable } from "@repo/database";
import { revalidatePath } from "next/cache";
import { dataListAnatomy } from "@chakra-ui/react/anatomy";
import { timestamp } from "drizzle-orm/gel-core";
import { and, eq, or } from "drizzle-orm";

export async function DeleteTimeTable(object: z.infer<typeof userSchema>) {
  revalidatePath("timetable");
}

export const GetElements = async () => {
  return await getDb().select().from(timetable).limit(4);
};

type ID = {
  id: number;
};

export const GetStationByID = async ({ id }: ID) => {
  // idが合致するテーブルを選択はするが、idはユニーク制約により一意に定まる(はず...)
  const result = await getDb().select().from(station).where(eq(station.id, id));
  return result[0];
};
