"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { HiShoppingCart } from "react-icons/hi";
import { Button } from "./ui/button";

function CartSheet() {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <HiShoppingCart size={20} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Cart </SheetTitle>
            <SheetDescription>
              Their are 5 items are in your cart, you may confirm and proceed to
              payment or remove some items.
            </SheetDescription>
          </SheetHeader>

          {/* cards for each item */}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CartSheet;
