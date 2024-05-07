"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

function SignOutButton({ className }) {
  return (
    <Button
      className={className}
      variant="destructive"
      onClick={() => signOut()}
    >
      Sign out
    </Button>
  );
}

export default SignOutButton;
