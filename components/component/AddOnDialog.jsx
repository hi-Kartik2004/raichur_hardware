// AddOnDialog.js
import React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Link from "next/link";

function AddOnDialog({ addons }) {
  if (!addons || addons.length === 0) return null; // Add a check for empty or undefined addons
  console.log(addons);
  return (
    <div className="">
      <h2 className="text-xl font-semibold">Add ons</h2>
      <p className="text-muted-foreground">Frequently bought together</p>

      <div className="mt-4">
        {addons.map((addonGroup, groupIndex) => (
          <div key={groupIndex}>
            {" "}
            {/* Add a key for each addon group */}
            {addonGroup.map((addon, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b"
              >
                <Link href={`/product/${addon?.id}`} className="flex gap-4">
                  <img
                    src={addon?.images[0]}
                    alt={addon?.name}
                    className="max-w-[70px] rounded-sm aspect-square"
                  />{" "}
                  {/* Access the addon's image */}
                  <div>
                    <p className="text-md font-medium">{addon?.name}</p>
                    <p className="text-muted-foreground line-clamp-1 text-sm">
                      {addon?.description}
                    </p>
                    <p className="text-xs mt-2">View &rarr;</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddOnDialog;
