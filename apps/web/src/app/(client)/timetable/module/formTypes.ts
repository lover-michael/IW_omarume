import { z } from "zod";

// バリデーションエラーに留意(空のデータではhandleSubmitが発火しない)
export const TimeTableSchema = z.object({
  memo: z
    .string()
    .max(100, { message: "最大100文字で入力してください" })
    .optional(),
  depart_station_id: z.number(),
  arrive_station_id: z.number(),
});

export type TimeTableSchemaType = z.infer<typeof TimeTableSchema>;
