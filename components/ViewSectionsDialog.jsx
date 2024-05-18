"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";

export function ViewSectionsDialog({ product }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Sections</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Product Sections</DialogTitle>
          <DialogDescription>
            View all the sections for this product.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          {product.sections.map((section, index) => (
            <div key={index} className="">
              <p className="text-sm underline underline-offset-4">
                Section {index + 1}
              </p>
              <div className="mt-2">
                <h4 className="font-semibold">{section?.title}</h4>
                <p className="text-muted-foreground">{section?.description}</p>
              </div>
              <Separator className="my-4" />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
