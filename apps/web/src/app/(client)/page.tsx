import { sessionAction } from "../(auth)/login/action/loginAction";
import UserInfo from "./ui/userInfo";
import GuideLogin from "./ui/guideLogin";

export type User = {
  id: number | undefined;
  name: string | undefined | null;
  email: string | undefined | null;
};

export default async function Page() {
  const user = await sessionAction();
  const userName = user?.user?.name;
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {user ? <UserInfo user={userName ? { name: userName } : { name: "" }} /> : <GuideLogin />}
    </div>
  );
}
