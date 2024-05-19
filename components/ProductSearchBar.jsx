"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Input } from "./ui/input";
import { HiOutlineSearch } from "react-icons/hi";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { SheetClose } from "./ui/sheet";

// Custom debounce function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

async function searchInAllProducts(searchQuery) {
  const q = query(
    collection(db, "products"),
    where("hide", "==", false),
    orderBy("name_lowercase"),
    startAt(searchQuery.toLowerCase()),
    endAt(searchQuery.toLowerCase() + "\uf8ff")
  );

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

function ProductSearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = async (query) => {
    if (query.trim() !== "") {
      const searchedProducts = await searchInAllProducts(query);
      setProducts(searchedProducts);
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div className="lg:max-w-[250px] w-full flex justify-between gap-2 flex-wrap relative">
      <Input
        placeholder="Search for products"
        className="bg-background border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring focus:border-blue-300"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            debouncedSearch.cancel();
            handleSearch(searchQuery);
          }
        }}
      />
      <HiOutlineSearch
        className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer text-gray-400"
        onClick={() => {
          debouncedSearch.cancel();
          handleSearch(searchQuery);
        }}
      />
      {/* Render the list of products */}
      {isDropdownOpen && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {products.length > 0 ? (
            products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="border-b last:border-0 p-4 flex gap-4 items-center"
              >
                <div>
                  <img
                    src={product?.images[0]}
                    alt={product?.name}
                    className="w-[50px] h-[50px] object-cover rounded-lg"
                  />
                </div>
                <div className="max-w-[200px]">
                  <Link
                    href={"/product/" + product?.id}
                    className=" text-md font-semibold"
                  >
                    <SheetClose>{product.name}</SheetClose>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 p-4">No products found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductSearchBar;
