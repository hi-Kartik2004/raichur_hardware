import { auth } from "@/auth";
import NotAuthorized from "@/components/NotAuthorized";
import React from "react";

async function layout({ children }) {
  const session = await auth();

  if (!session) {
    return <NotAuthorized />;
  }

  return <div>{children}</div>;
}

export default layout;
