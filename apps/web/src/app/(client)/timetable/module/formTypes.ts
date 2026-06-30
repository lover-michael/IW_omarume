import { z } from "zod";

// バリデーションエラーに留意(空のデータではhandleSubmitが発火しない)
export const TimeTableSchema = z.object({
  memo: z
    .string()
    .max(100, { message: "最大100文字で入力してください" })
    .optional(),
  stations: z.object({
    depart_station_id: z.number(),
    arrive_station_id: z.number(),
  }),
});

type user_id = {
  user_id: number;
};

export type TimeTableFormType = z.infer<typeof TimeTableSchema>;

export type TimeTableSchemaType = TimeTableFormType & user_id;

export type STATION = {
  id: number;
  create_at: Date;
  name: string;
  day: string;
  hour: string;
  minute: string;
  direction: string;
};
