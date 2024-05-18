import React from "react";
import { Input } from "./ui/input";
import { HiMenu, HiOutlineMenu, HiOutlineSearch } from "react-icons/hi";
import Link from "next/link";
import { Button } from "./ui/button";
import CartSheet from "./CartSheet";
import { auth, signIn } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import MobileNavbarSlider from "./MobileNavbarSlider";
import UserButton from "./UserButton";
import SignInButton from "./SignInButton";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Caesar_Dressing } from "next/font/google";

async function MobileNavbar() {
  async function handleLoginByGoogle() {
    "use server";
    await signIn("google", { redirectTo: "/private" });
  }
  const session = await auth();

  async function getAllCategories() {
    const ref = query(collection(db, "categories"), orderBy("timestamp"));
    const snapshot = await getDocs(ref);
    let categories = [];
    snapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    return categories;
  }

  const categories = await getAllCategories();
  return (
    <div>
      {/* Top Navbar */}
      <div className="flex justify-between gap-2 flex-wrap items-center px-4 fixed w-full py-2 bg-background">
        <div className="w-full flex-wrap flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <MobileNavbarSlider categories={categories} />
            <Link href="/">
              <img
                src="/logo.png"
                alt="logo"
                className=" max-w-[100px] lg:max-w-[120px]"
              />
            </Link>
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
            {session?.user ? <UserButton /> : <SignInButton />}
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
