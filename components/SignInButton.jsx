import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/auth";

function SignInButton({ className }) {
  async function handleLoginByGoogle() {
    "use server";
    await signIn("google");
  }
  return (
    <form action={handleLoginByGoogle} className={className}>
      <Button type="submit">Sign in</Button>
    </form>
  );
}

export default SignInButton;
