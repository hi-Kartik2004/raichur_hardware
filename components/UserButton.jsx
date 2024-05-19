"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
// import { useSession } from "next-auth/client";

import { Skeleton } from "./ui/skeleton";
import { useSession } from "next-auth/react";
import globalData from "@/app/data";

function UserButton() {
  const { data: session, status, loading } = useSession();

  if (status === "loading")
    return <Skeleton className="w-10 h-10 rounded-full" />;

  if (status === "unauthenticated") return null;
  let showAdminLink = false;
  // console.log("session", session);

  if (globalData.adminEmails.includes(session.user.email)) {
    showAdminLink = true;
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-8 h-8 -mt-1">
            <AvatarImage src={session.user?.image} alt="avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem className="w-full">
              {session.user?.name || session.user?.email}
            </DropdownMenuItem>
            {showAdminLink && (
              <DropdownMenuItem className="w-full">
                <Link href="/admin" className="w-full">
                  Admin Panel
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="w-full">
              <Link href="/my-orders" className="w-full">
                My Orders
              </Link>
            </DropdownMenuItem>
            <SignOutButton className="mt-2 flex w-full" />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserButton;
