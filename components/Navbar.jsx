import React from "react";
import { Input } from "./ui/input";
import Link from "next/link";
import { HiOutlineSearch } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FaCartShopping } from "react-icons/fa6";
import { Button } from "./ui/button";
import CartSheet from "./CartSheet";
import { signIn } from "@/auth";
import { Separator } from "./ui/separator";
import ProductSearchBar from "./ProductSearchBar";

function Navbar() {
  async function handleLoginByGoogle() {
    "use server";
    await signIn("google", { redirectTo: "/private" });
  }

  return (
    <div className="pb-2">
      <nav className="container pt-2">
        {/* Top Navbar */}
        <div className="flex justify-between gap-2 flex-wrap items-center ">
          <div className="  max-w-[600px] w-full flex-wrap flex gap-10 items-center">
            <img src="/logo.png" alt="logo" className=" max-w-[120px]" />
            <ProductSearchBar />

            <Link href="/faq" className="text-sm">
              FAQ
            </Link>
            <Link href="/contact" className="text-sm">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-6 ">
            {/* <Avatar> className="text-sm"
            <AvatarImage src="/next.svg" alt="avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar> */}

            <form action={handleLoginByGoogle}>
              <Button type="submit">Sign in</Button>
            </form>
            <CartSheet />
          </div>
        </div>

        <Separator className="my-2" />

        {/* Categories Bottom Navbar */}
        <div>
          <ul className="flex justify-start gap-14 flex-wrap mt-4 mb-2">
            <li>
              <Link href="/category/1" className="text-sm">
                Category 1
              </Link>
            </li>
            <li>
              <Link href="/category/1" className="text-sm">
                Category 1
              </Link>
            </li>
            <li>
              <Link href="/category/1" className="text-sm">
                Category 1
              </Link>
            </li>
            <li>
              <Link href="/category/1" className="text-sm">
                Category 1
              </Link>
            </li>

            <li>
              <Link href="/category/2" className="text-sm">
                Category 2
              </Link>
            </li>
            <li>
              <Link href="/category/3" className="text-sm">
                Category 3
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;