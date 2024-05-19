"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

function FilterForm({ showOnMobile, categories, onPriceRangeChange }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  const handlePriceRangeChange = () => {
    onPriceRangeChange(minPrice, maxPrice);
  };

  return (
    <div>
      <div
        className={`bg-white rounded-lg shadow-sm dark:bg-gray-950 dark:border dark:border-gray-800 ${
          showOnMobile ? "block lg:hidden" : "hidden lg:block"
        }`}
      >
        <div className="p-6 border-b dark:border-gray-800">
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        <div
          className={`p-6 space-y-6 ${
            showOnMobile ? "block lg:hidden " : "hidden lg:block"
          }`}
        >
          <div>
            <h4 className="text-base font-medium mb-4">Categories</h4>
            <div className="space-y-2">
              {categories &&
                categories.map((category) => (
                  <div
                    className="flex items-center md:justify-start justify-center gap-2"
                    key={category.categoryName}
                  >
                    <Link
                      href={`/category/${category.categoryName}`}
                      className="capitalize text-sm"
                    >
                      {category.categoryName}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="text-base mb-2">
              <div className="grid gap-2">
                <label htmlFor="min-price">Min Price</label>
                <Input
                  type="number"
                  id="min-price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
                <label htmlFor="max-price">Max Price</label>
                <Input
                  type="number"
                  id="max-price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
                <Button onClick={handlePriceRangeChange}>Apply</Button>
              </div>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterForm;
