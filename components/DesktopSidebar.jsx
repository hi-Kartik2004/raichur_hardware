"use client";
import React, { useEffect, useState } from "react";
import globalData from "@/app/data";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import Link from "next/link";

function DesktopSidebar() {
  const [categories, setCategories] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownClick = (dropdown) => {
    setActiveDropdown(dropdown === activeDropdown ? null : dropdown);
  };

  useEffect(() => {
    const fetchCategories = () => {
      const categoriesFromStorage = localStorage.getItem("categories");
      if (categoriesFromStorage) {
        setCategories(JSON.parse(categoriesFromStorage));
      }
    };

    fetchCategories(); // Initial fetch

    // Set interval to fetch categories every second
    const intervalId = setInterval(fetchCategories, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-muted pt-16 pb-4 overflow-auto max-h-screen">
      {globalData?.dropdowns &&
        globalData?.dropdowns.map((dropdown, index) => (
          <div key={index} className="flex flex-col mt-2 px-4 ">
            <button
              onClick={() => handleDropdownClick(dropdown)}
              className="text-left p-2 rounded-sm hover:bg-gray-200 flex justify-between w-full"
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
                {categories[dropdown]?.map((category) => (
                  <li
                    key={category.categoryName}
                    className="p-2 flex rounded-sm hover:bg-gray-100 w-full hover:border border-gray-200"
                  >
                    <Link
                      href={`/category/${category.categoryName}`}
                      className="text-sm w-full "
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
  );
}

export default DesktopSidebar;
