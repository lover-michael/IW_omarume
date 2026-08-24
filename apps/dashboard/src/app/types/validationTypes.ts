import { z } from "zod";

export const stationSchema = z.object({
  name: z.string().min(1, "駅名は必須です"),
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59),
  day: z.string().min(1, "曜日は必須です"),
  type: z.union([z.literal("depart"), z.literal("arrive")]),
});

export const fileSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((file) => file.length !== 0, "ファイルは必須です")
    .transform((file) => file[0])
    .refine((file) => file.name.endsWith(".csv"), "ファイルは.csvである必要があります"),
});

export type Station_ = z.infer<typeof stationSchema>;
export type File_ = z.infer<typeof fileSchema>;
