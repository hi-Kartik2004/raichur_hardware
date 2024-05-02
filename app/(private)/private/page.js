import { auth } from "@/auth";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

async function PrivatePage() {
  const session = await auth(); // pakka you will get this cuz if not handled in layout.js
  console.log(session);

  return (
    <div>
      <Avatar>
        <AvatarImage src={session.user.image} alt={session.user.name} />
      </Avatar>
    </div>
  );
}

export default PrivatePage;
