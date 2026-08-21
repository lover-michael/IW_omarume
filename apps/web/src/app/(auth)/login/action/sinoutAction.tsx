import { signOut } from "./login";

export function SignOutAction() {
  return (
    <form
      action={async () => {
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
