import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import ProductSearchBar from "./ProductSearchBar";
import SignInButton from "./SignInButton";
import UserButton from "./UserButton";
import CartSheet from "./CartSheet";
import globalData from "@/app/data";
import CategoriesNavbar from "./CategoriesNavbar";

async function Navbar() {
  const showCategories = true;

  const session = await auth();

  return (
    <div className="pb-2 fixed w-full bg-background z-10">
      <nav className="px-4 pt-2 w-full grid grid-cols-12">
        {/* Top Navbar */}
        <div className="flex justify-between items-center w-full flex-wrap gap-2 col-span-6">
          <div className="flex items-center gap-10">
            <Link href="/">
              <img
                src={globalData?.logoUrl}
                alt="logo"
                className="max-w-[50px] md:max-w-[70px]"
              />
            </Link>
            <ProductSearchBar />
            <Link href="/about" className="text-sm">
              About
            </Link>
            <Link href="/faq" className="text-sm">
              FAQ
            </Link>
            <Link href="/contact" className="text-sm">
              Contact
            </Link>
            <Link href="/gallery" className="text-sm">
              Gallery
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-6 col-start-10 col-end-12">
          {session?.user ? <UserButton /> : <SignInButton />}
          <CartSheet />
        </div>
        {/* Categories Bottom Navbar */}
        {/* {showCategories && <CategoriesNavbar />} */}
      </nav>
    </div>
  );
}

export default Navbar;
