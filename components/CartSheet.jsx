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

          <div className="space-y-4 mt-10">
            <div className="flex items-center gap-4">
              <img
                alt="Product Image"
                className="rounded-md"
                height={64}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "64/64",
                  objectFit: "cover",
                }}
                width={64}
              />
              <div className="flex-1">
                <h3 className="font-medium">Acme Circles T-Shirt</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      <MinusIcon className="h-5 w-5" />
                    </button>
                    <span>2</span>
                    <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <span className="font-medium">$39.99</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img
                alt="Product Image"
                className="rounded-md"
                height={64}
                src="/placeholder.svg"
                style={{
                  aspectRatio: "64/64",
                  objectFit: "cover",
                }}
                width={64}
              />
              <div className="flex-1">
                <h3 className="font-medium">Acme Hoodie</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      <MinusIcon className="h-5 w-5" />
                    </button>
                    <span>1</span>
                    <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      <PlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <span className="font-medium">$59.99</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-6">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="font-medium">$99.98</span>
            </div>
            <Button className="w-full mt-4">Checkout</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CartSheet;

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
