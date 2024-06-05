"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { StarIcon } from "@radix-ui/react-icons";
import FilterForm from "./FilterForm";
// import { StarIcon } from "lucide-react";

function FilterSheet({ showOnMobile, categories, onPriceRangeChange }) {
  const [open, setOpen] = useState(false);

  function closeSheet() {
    setOpen(false);
  }

  return (
    <div className={`block xl:hidden`}>
      <Sheet
        open={open}
        onOpenChange={() => {
          setOpen(!open);
        }}
      >
        <SheetTrigger asChild>
          <Button variant="secondary">Filter</Button>
        </SheetTrigger>
        <SheetContent>
          <FilterForm
            showOnMobile={showOnMobile}
            categories={categories}
            onPriceRangeChange={onPriceRangeChange}
            closeSheet={closeSheet}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default FilterSheet;
