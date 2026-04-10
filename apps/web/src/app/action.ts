'use server';
import { db } from '@/lib/drizzle';
import { z } from 'zod';
import { userSchema } from './timetable/userSchema';
import { station, timetable } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { dataListAnatomy } from '@chakra-ui/react/anatomy';
import { timestamp } from 'drizzle-orm/gel-core';
import { and, eq, or } from 'drizzle-orm';

export async function SaveTimeTable(formData: z.infer<typeof userSchema>, path: string) {
  revalidatePath(path);
}

export async function DeleteTimeTable(object: z.infer<typeof userSchema>) {
  revalidatePath('timetable');
}


export const GetElements = async () => {
  return await db.select().from(timetable);
};

type ID = {
  id: number;
}

export const GetStationByID = async ({ id }: ID) => {
  // idが合致するテーブルを選択はするが、idはユニーク制約により一意に定まる(はず...)
  return await db.select().from(station).where(eq(station.id, id));
}