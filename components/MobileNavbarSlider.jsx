"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineMenuAlt1,
} from "react-icons/hi";
import ProductSearchBar from "./ProductSearchBar";
import Link from "next/link";
import { Button } from "./ui/button";
import globalData from "@/app/data";

function MobileNavbarSlider({
  categories,
  showOnlyDropdowns = false,
  triggerName,
}) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownClick = (dropdown) => {
    setActiveDropdown(dropdown === activeDropdown ? null : dropdown);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          {triggerName ? (
            <span className="text-sm underline underline-offset-8">
              {triggerName}
            </span>
          ) : (
            <HiOutlineMenuAlt1 size={25} />
          )}
        </SheetTrigger>
        <SheetContent side="left" className="overflow-auto">
          {!showOnlyDropdowns && (
            <>
              <SheetHeader>Mobile Menu</SheetHeader>
              <SheetDescription>
                Manage all the important sections of this website from here.
              </SheetDescription>
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex w-full">
                  <ProductSearchBar onSheet={true} />
                </div>
                <SheetClose className="w-full">
                  <Button className="w-full">
                    <Link href="/category/all" className="w-full">
                      View All products &rarr;
                    </Link>
                  </Button>
                </SheetClose>
                <div className="mt-4">
                  <p className="underline underline-offset-8">Links</p>
                </div>
                <div className="flex justify-start items-center">
                  <Link href="/">
                    <SheetClose>Home</SheetClose>
                  </Link>
                </div>
                <div className="flex justify-start items-center">
                  <Link href="/about">
                    <SheetClose>About</SheetClose>
                  </Link>
                </div>
                <div className="flex justify-start items-center">
                  <Link href="/gallery">
                    <SheetClose>Gallery</SheetClose>
                  </Link>
                </div>
                <div className="flex justify-start items-center">
                  <Link href="/faq">
                    <SheetClose>FAQ's</SheetClose>
                  </Link>
                </div>
                <div className="flex justify-start items-center">
                  <Link href="/contact">
                    <SheetClose>Contact</SheetClose>
                  </Link>
                </div>
              </div>
            </>
          )}

          <div className="mt-4">
            <p className="underline underline-offset-8">Categories</p>
          </div>

          {globalData?.dropdowns &&
            globalData?.dropdowns.map((dropdown, index) => (
              <div key={index} className="flex flex-col mt-2">
                <button
                  onClick={() => handleDropdownClick(dropdown)}
                  className="text-left py-2 rounded-sm hover:bg-gray-200 flex justify-between w-full"
                >
                  {dropdown}
                  <span>
                    {activeDropdown === dropdown ? (
                      <HiOutlineChevronUp />
                    ) : (
                      <HiOutlineChevronDown />
                    )}
                  </span>
                </button>
                {activeDropdown === dropdown && (
                  <ul>
                    {categories[dropdown] &&
                      categories[dropdown].map((category) => (
                        <li
                          key={category.categoryName}
                          className="p-2 flex rounded-sm hover:bg-gray-100 w-full"
                        >
                          <Link
                            href={`/category/${category.categoryName}`}
                            className="text-sm w-full"
                          >
                            <SheetClose>{category.categoryTitle}</SheetClose>
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbarSlider;
