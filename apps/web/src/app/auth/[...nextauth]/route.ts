import { getAuth } from "@/app/(auth)/login/component/action/login";
export const { GET, POST } = (await getAuth()).handlers;
