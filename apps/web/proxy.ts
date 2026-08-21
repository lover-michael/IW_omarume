export { auth as proxy } from "@/app/(auth)/login/action/login";

export const config = {
  matcher: ["/src/app/(client)/timetable/:path*"],
};
