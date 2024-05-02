import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  async function showLogin() {
    "use server";
    await signIn("github");
  }
  return (
    <main>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <Button type="submit" className="m-2">
          Signin with GitHub
        </Button>
      </form>

      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button type="submit" className="m-2">
          Signin with Google
        </Button>
      </form>
    </main>
  );
}
