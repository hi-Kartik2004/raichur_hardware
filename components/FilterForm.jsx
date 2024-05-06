import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { StarIcon } from "@radix-ui/react-icons";

function FilterForm({ showOnMobile }) {
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
            <h4 className="text-base font-medium mb-2">Categories</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="category-1" />
                <Label htmlFor="category-1">Clothing</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="category-2" />
                <Label htmlFor="category-2">Electronics</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="category-3" />
                <Label htmlFor="category-3">Home & Garden</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="category-4" />
                <Label htmlFor="category-4">Beauty</Label>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-base font-medium mb-2">
              <div className="grid gap-2">
                <Label htmlFor="price-range">Price Range</Label>
                <Slider
                  className="w-full"
                  //   defaultValue={[50, 300]}
                  id="price-range"
                  max={500}
                  min={0}
                  step={10}
                />
              </div>
            </h4>
          </div>
          <div>
            <h4 className="text-base font-medium mb-2">Rating</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="rating-5" />
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="rating-4" />
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="rating-3" />
                <div className="flex items-center gap-0.5">
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-primary" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                  <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterForm;
