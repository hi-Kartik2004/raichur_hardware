"use client";
import React, { useEffect, useState } from "react";
import globalData from "@/app/data";
import Link from "next/link";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase/config";

const CACHE_KEY = "categories";
const CACHE_TIMESTAMP_KEY = "categories_timestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function DesktopSidebar() {
  const [categories, setCategories] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeGlobalDropdown, setActiveGlobalDropdown] = useState(null);
  const [recentlyOpenedDropdown, setRecentlyOpenedDropdown] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchCategoriesFromFirebase = async () => {
      try {
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
        localStorage.setItem(CACHE_KEY, JSON.stringify(categoriesData));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    const fetchCategories = () => {
      const categoriesFromStorage = localStorage.getItem(CACHE_KEY);
      const timestampFromStorage = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      const isCacheExpired =
        !timestampFromStorage ||
        Date.now() - timestampFromStorage > CACHE_DURATION;

      if (categoriesFromStorage && !isCacheExpired) {
        const parsedCategories = JSON.parse(categoriesFromStorage);

        setCategories(parsedCategories);
        setLoading(false);
      } else {
        fetchCategoriesFromFirebase(); // Fetch categories from Firebase if not in localStorage or cache expired
      }
    };

    fetchCategories(); // Fetch categories on initial load

    const handleStorageChange = () => {
      fetchCategories();
    };

    // Add event listener for localStorage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 pt-16 pb-4 overflow-auto max-h-screen max-w-[400px] h-screen border-r px-2 w-full">
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
    </div>
  );
}

export default DesktopSidebar;
