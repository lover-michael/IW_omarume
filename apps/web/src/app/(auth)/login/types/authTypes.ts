import { z } from "zod";

export const AuthProps = z.object({
  userName: z
    .string()
    .min(4, { message: "名前は4文字以上です" })
    .max(16, { message: "名前は16文字以下です" }),
  email: z
    .string()
    .email({ message: "正しいメールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上です" })
    .max(16, { message: "パスワードは16文字以下です" }),
});

export type AuthPropsType = z.infer<typeof AuthProps>;
