"use client";
import React from "react";
import { Input } from "./ui/input";
import { HiOutlineSearch } from "react-icons/hi";

function ProductSearchBar() {
  return (
    <div className="xl:max-w-[250px] w-full  flex justify-between gap-2 flex-wrap relative">
      <Input placeholder="Search for products" className="bg-background" />
      <HiOutlineSearch className="absolute right-2 top-[50%] translate-y-[-50%]" />
    </div>
  );
}

export default ProductSearchBar;
