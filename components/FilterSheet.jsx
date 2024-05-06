"use client";
import React from "react";
import {
  Sheet,
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

function FilterSheet({ showOnMobile }) {
  return (
    <div className={`block xl:hidden`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="secondary">Filter</Button>
        </SheetTrigger>
        <SheetContent>
          <FilterForm showOnMobile={showOnMobile} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default FilterSheet;
