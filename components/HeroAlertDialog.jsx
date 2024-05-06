"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function HeroAlertDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpen(true);
    }, [1000]);

    return () => {
      setOpen(false);
    };
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Summer Offer!</DialogTitle>
          <DialogDescription>
            Get upto 10% off on your first purchase. Use code: SUMMER10
          </DialogDescription>
        </DialogHeader>

        <img src="/placeholder.svg" alt="Summer Offer" className="rounded" />
      </DialogContent>
    </Dialog>
  );
}

export default HeroAlertDialog;
