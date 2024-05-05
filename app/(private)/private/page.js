import { auth, signOut } from "@/auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";

async function PrivatePage() {
  const session = await auth(); // pakka you will get this cuz if not handled in layout.js
  console.log(session);

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <div>
      <Avatar>
        <AvatarImage src={session.user.image} alt={session.user.name} />
      </Avatar>
      <form action={handleSignOut}>
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}

export default PrivatePage;
