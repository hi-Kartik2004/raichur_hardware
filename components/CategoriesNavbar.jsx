"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import globalData from "@/app/data";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import MobileNavbarSlider from "./MobileNavbarSlider";

const CategoriesNavbar = () => {
  const [categories, setCategories] = useState({});

  // Fetch categories from Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = {};
      const categoriesCollection = collection(db, "categories");
      const querySnapshot = await getDocs(categoriesCollection);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const dropdown = data.dropdown;

        if (!categoriesData[dropdown]) {
          categoriesData[dropdown] = [];
        }
        categoriesData[dropdown].push(data);
      });

      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Separator className="my-2" />
      <div className="relative">
        <ul className="flex justify-start gap-14 flex-wrap mt-4 mb-2 items-center">
          {globalData?.dropdowns?.slice(0, 9)?.map((dropdown) => (
            <li key={dropdown} className="relative">
              <HoverCard openDelay={0}>
                <HoverCardTrigger asChild>
                  <button className="text-sm capitalize">{dropdown}</button>
                </HoverCardTrigger>
                <HoverCardContent className="bg-white shadow-lg border rounded-md w-48 z-20 p-2">
                  <ul className="flex flex-col w-full">
                    {categories[dropdown] &&
                      categories[dropdown].map((category) => (
                        <li
                          key={category.categoryName}
                          className="p-2 flex hover:bg-gray-100 w-full"
                        >
                          <Link
                            href={`/category/${category.categoryName}`}
                            className="text-sm w-full"
                          >
                            {category.categoryTitle}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </HoverCardContent>
              </HoverCard>
            </li>
          ))}
          <li className="relative">
            <MobileNavbarSlider
              categories={categories}
              showOnlyDropdowns={true}
              triggerName={"View all"}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default CategoriesNavbar;
