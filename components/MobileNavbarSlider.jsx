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
  const [activeGlobalDropdown, setActiveGlobalDropdown] = useState(null);
  const [recentlyOpenedDropdown, setRecentlyOpenedDropdown] = useState(null);

  const handleGlobalDropdownClick = (globalDropdown) => {
    setActiveGlobalDropdown(
      globalDropdown === activeGlobalDropdown ? null : globalDropdown
    );
    setActiveDropdown(null); // Reset active dropdown when global dropdown changes
    setRecentlyOpenedDropdown(null); // Reset recently opened dropdown
  };

  const handleDropdownClick = (dropdown) => {
    setActiveDropdown(dropdown === activeDropdown ? null : dropdown);
    setRecentlyOpenedDropdown(dropdown); // Set recently opened dropdown
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

          <div className="mt-4 mb-4">
            <p className="underline underline-offset-8">Categories</p>
          </div>

          {globalData?.globalDropdowns &&
            globalData?.globalDropdowns.map((globalDropdown, index) => (
              <div
                key={index}
                className={`flex flex-col mt-2 ${
                  activeGlobalDropdown === globalDropdown.name &&
                  "border border-gray-400 rounded"
                }`}
              >
                <button
                  onClick={() => handleGlobalDropdownClick(globalDropdown.name)}
                  className={`text-left p-2 rounded-sm hover:bg-muted focus:bg-muted focus:border flex justify-between w-full ${
                    activeGlobalDropdown === globalDropdown.name &&
                    "border border-gray-500"
                  }`}
                >
                  {globalDropdown.name}
                  <span>
                    {activeGlobalDropdown === globalDropdown.name ? (
                      <HiOutlineChevronUp />
                    ) : (
                      <HiOutlineChevronDown />
                    )}
                  </span>
                </button>
                {activeGlobalDropdown === globalDropdown.name && (
                  <div className="bg-slate-50 border border-slate-50 rounded">
                    {globalDropdown.dropdowns.map((dropdown, dropdownIndex) => (
                      <div
                        key={dropdownIndex}
                        className={`flex flex-col mt-2 border border-muted border-dashed  ${
                          recentlyOpenedDropdown === dropdown
                            ? "bg-muted rounded border"
                            : ""
                        }`}
                      >
                        <button
                          onClick={() => handleDropdownClick(dropdown)}
                          className={`text-left p-2 rounded-sm hover:border hover:border-gray-400 border border-muted border-dashed flex justify-between w-full pl-4 ${
                            activeDropdown === dropdown &&
                            "border-dashed border border-gray-500"
                          } `}
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
                          <ul className="bg-white border border-gray-400 border-dashed">
                            {categories[dropdown]?.map((category) => (
                              <li
                                key={category.categoryName}
                                className="py-2 pl-6 flex  hover:border hover:border-gray-600 border-gray-100 border w-full"
                              >
                                <Link
                                  href={`/category/${category.categoryName}`}
                                  className="text-sm w-full text-start"
                                >
                                  {category.categoryTitle}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbarSlider;
