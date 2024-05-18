"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { useRouter } from "next/navigation";
import { RadioTower } from "lucide-react";
import { useSession, signIn } from "next-auth/react";

function AddToCartButton({
  productName,
  price,
  quantity,
  imageUrl,
  productId,
}) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [submitting, setSubmitting] = useState(false);
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
      }),
    });

    if (resp.ok) {
      toast({
        title: "Added to cart",
        description: `Product ${productName} added to cart`,
      });

      router.refresh();
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
          {submitting ? "Adding..." : "Add to cart"}
        </Button>
      ) : (
        <Button onClick={() => signIn()}>Sign In to Add to Cart</Button>
      )}
    </>
  );
}

export default AddToCartButton;
