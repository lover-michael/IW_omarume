import { z } from 'zod';

// バリデーションエラーに留意(空のデータではhandleSubmitが発火しない)
export const userSchema = z.object({
  memo: z.string().max(200).optional(),
  to: z.string().max(20).array(),
  from: z.string().max(20).array(),
  day: z.string().max(3).optional(),
});

export type Test = z.infer<typeof userSchema>;
