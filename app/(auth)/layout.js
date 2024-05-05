import { auth } from "@/auth";
import NotAuthorized from "@/components/NotAuthorized";
import { redirect } from "next/navigation";
import React from "react";

async function AuthLayout({ children }) {
  const session = await auth(); // pakka you will get this cuz if not handled in layout.js
  if (session) {
    redirect("/");
  }
  return <div>{children}</div>;
}

export default AuthLayout;
