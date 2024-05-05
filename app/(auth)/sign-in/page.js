import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

function SignInPage() {
  async function handleLoginByGoogle() {
    "use server";
    await signIn("google", { redirectTo: "/private" });
  }

  return (
    <div>
      <form action={handleLoginByGoogle}>
        <Button type="submit">Sign in with Google</Button>
      </form>
    </div>
  );
}

export default SignInPage;
