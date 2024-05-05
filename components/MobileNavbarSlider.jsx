import React from "react";
import { Slider } from "./ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import ProductSearchBar from "./ProductSearchBar";
import Link from "next/link";
import SignInButton from "./SignInButton";

function MobileNavbarSlider() {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <HiOutlineMenuAlt1 />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>Mobile Menu</SheetHeader>
          <SheetDescription>
            Manage all the important sections of this website from here.
          </SheetDescription>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex w-full">
              <ProductSearchBar />
            </div>
            <div className="mt-4">
              <p className="underline underline-offset-8">Links</p>
            </div>
            <div className="">
              <Link href="/">Home</Link>
            </div>
            {/* <div className="flex w-full">
              <SignInButton className="flex w-full" />
            </div> */}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbarSlider;
