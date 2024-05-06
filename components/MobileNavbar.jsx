import React from "react";
import { Input } from "./ui/input";
import { HiMenu, HiOutlineMenu, HiOutlineSearch } from "react-icons/hi";
import Link from "next/link";
import { Button } from "./ui/button";
import CartSheet from "./CartSheet";
import { signIn } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import MobileNavbarSlider from "./MobileNavbarSlider";

function MobileNavbar() {
  async function handleLoginByGoogle() {
    "use server";
    await signIn("google", { redirectTo: "/private" });
  }
  return (
    <div>
      {/* Top Navbar */}
      <div className="flex justify-between gap-2 flex-wrap items-center px-4 fixed w-full py-2 bg-background">
        <div className="w-full flex-wrap flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <MobileNavbarSlider />
            <img
              src="/logo.png"
              alt="logo"
              className=" max-w-[100px] lg:max-w-[120px]"
            />
          </div>
          {/* <div className="max-w-[250px] w-full  flex justify-between gap-2 flex-wrap relative">
            <Input
              placeholder="Search for products"
              className="bg-background"
            />
            <HiOutlineSearch className="absolute right-2 top-[50%] translate-y-[-50%]" />
          </div> */}

          {/* <Link href="/faq" className="text-sm">
            FAQ
          </Link>
          <Link href="/contact" className="text-sm">
            Contact
          </Link> */}

          <div className="flex gap-4 items-center">
            {/* <Avatar>
              <AvatarImage src="/next.svg" alt="avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar> */}

            <Button size={"sm"}>Sign in</Button>
            <CartSheet />
          </div>
        </div>
        {/* <div className="flex items-center gap-6 ">
         

          <form action={handleLoginByGoogle}>
            <Button type="submit">Sign in</Button>
          </form>
          <CartSheet />
        </div> */}
      </div>
    </div>
  );
}

export default MobileNavbar;
