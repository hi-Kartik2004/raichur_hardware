// AddToCartButton.js

import React, { useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { ShoppingCartIcon } from "lucide-react";
import { toast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import AddOnDialog from "./component/AddOnDialog";
import { Separator } from "./ui/separator";

function AddToCartButton({
  productName,
  price,
  quantity,
  imageUrl,
  productId,
  maxQuantity,
  inventory,
  color,
  size,
  showAddOnDialog,
  addons,
}) {
  const maxLimit = Math.min(inventory, maxQuantity);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitting, setSubmitting] = useState(false);

  const [showDialog, setShowDialog] = useState(false);

  async function handleAddToCart(productName) {
    setSubmitting(true);
    console.log("Adding to cart", productName);
    const resp = await fetch(`/api/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: productName,
        price: price,
        quantity: quantity,
        imageUrl: imageUrl,
        productId: productId,
        color: color,
        size: size,
      }),
    });

    if (resp.ok) {
      toast({
        title: "Added to cart",
        description: `Product ${productName} added to cart`,
      });

      setShowDialog(true);
    } else {
      toast({
        variant: "destructive",
        title: "Error adding to cart",
        description: `Product ${productName} not added to cart`,
      });
    }

    setSubmitting(false);
  }

  return (
    <>
      <Toaster />
      {status === "authenticated" ? (
        <Button className="w-full" onClick={() => handleAddToCart(productName)}>
          <ShoppingCartIcon className="mr-2 h-4 w-4" />{" "}
          {submitting ? "Adding..." : "Add to cart"}
        </Button>
      ) : (
        <Button onClick={() => signIn()}>Sign In to Add to Cart</Button>
      )}

      <Separator className="mt-4" />

      {showDialog && showAddOnDialog && <AddOnDialog addons={addons} />}
    </>
  );
}

export default AddToCartButton;
