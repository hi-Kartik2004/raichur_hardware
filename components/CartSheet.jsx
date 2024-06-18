"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Dialog, DialogContent } from "./ui/dialog";
import { HiShoppingCart } from "react-icons/hi";
import { Button } from "./ui/button";
import Link from "next/link";
import { toast } from "./ui/use-toast";
import { signIn, useSession } from "next-auth/react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import globalData from "@/app/data";
import BillV0 from "./component/bill-v0";

async function getMyCart() {
  let response;
  try {
    response = await fetch("/api/get-my-cart");
    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error fetching cart items",
      });
      return { data: [] };
    }
  } catch (err) {
    console.error(err);
    return { data: [] };
  }
  return await response.json();
}

async function updateCartItem(itemId, quantity) {
  try {
    const response = await fetch("/api/update-cart-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId, quantity }),
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error updating cart item",
      });
      return;
    }
  } catch (error) {
    console.error("Error updating cart item", error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Error updating cart item",
    });
  }
}

async function deleteCartItem(itemId) {
  try {
    const response = await fetch(`/api/delete-cart-item`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error deleting cart item",
      });
      return;
    }
  } catch (error) {
    console.error("Error deleting cart item", error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Error deleting cart item",
    });
  }
}

async function clearCart(cartItems) {
  for (const item of cartItems) {
    await deleteCartItem(item.id);
  }
}

function CartSheet() {
  const { data: session, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const [billDialogOpen, setBillDialogOpen] = useState(false);

  async function checkout(cartItems, totalAmount, userDetails) {
    setSubmitting(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems, totalAmount, userDetails }),
      });
      setSubmitting(false);

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error during checkout",
        });
        return;
      }
      const data = await response.json();
      toast({
        title: "Checkout Successful!",
        description:
          "We will contact you regarding the product pickup time or delivery.",
      });

      // Clear cart items after successful checkout
      cartItems.map(async (item) => {
        await deleteCartItem(item.id);
      });

      setCheckoutDetails({
        cartItems: cartItems,
        totalAmount: totalAmount,
        userDetails: userDetails,
      });

      globalData?.adminEmails &&
        globalData?.adminEmails.includes(session?.user?.email) &&
        setBillDialogOpen(true);
    } catch (error) {
      console.error("Error during checkout", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error during checkout",
      });
    }

    setSubmitting(false);
  }

  if (status === "unauthenticated") {
    return (
      <div>
        <Sheet open={open} onOpenChange={() => setOpen(!open)}>
          <SheetTrigger>
            <HiShoppingCart size={20} />
          </SheetTrigger>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
              <SheetDescription>
                There are {cartItems?.length} items in your cart. You may
                confirm and proceed to payment or remove some items.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4 mt-10">
              <div>
                <p className="text-center">Your cart is empty</p>
                <Button className="w-full mt-4 border" onClick={() => signIn()}>
                  Sign in to view your cart
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  useEffect(() => {
    async function helper() {
      setLoading(true);
      try {
        const cartItems = await getMyCart();
        console.log("cartItems", cartItems);
        setCartItems(cartItems.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    if (status === "authenticated") {
      if (open === true) helper();
    }
  }, [open]);

  const handleQuantityChange = async (itemId, quantity) => {
    await updateCartItem(itemId, quantity);
    const updatedCartItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDeleteItem = async (itemId) => {
    await deleteCartItem(itemId);
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const handleCheckout = async () => {
    setDialogOpen(true);
  };

  const handleDialogSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    await checkout(cartItems, totalAmount, userDetails);
    setDialogOpen(false);
    setCartItems([]);
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      await clearCart(cartItems);
      setCartItems([]); // Clear cart items after confirmation
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart.",
      });
    }
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={() => setOpen(!open)}>
        <SheetTrigger>
          <HiShoppingCart size={20} />
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              There are {cartItems?.length} items in your cart. You may confirm
              and proceed to payment or remove some items.
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 mt-10">
            {loading ? (
              <p className="mt-4 text-center w-full">
                Loading your cart items...
              </p>
            ) : cartItems.length === 0 ? (
              <div>
                <p className="text-center">Your cart is empty</p>
                <Button className="w-full mt-4 border">
                  <Link href="/category/all" className="w-full">
                    <SheetClose>Shop Now</SheetClose>
                  </Link>
                </Button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 relative">
                  <Link href={`/product/${item?.productId}`}>
                    <SheetClose>
                      <img
                        alt="Product Image"
                        className="rounded-md relative"
                        height={64}
                        src={item?.imageUrl}
                        style={{
                          aspectRatio: "64/64",
                          objectFit: "cover",
                        }}
                        width={64}
                      />
                    </SheetClose>
                  </Link>
                  <div className="flex-1">
                    <Link
                      href={`/product/${item?.productId}`}
                      className="font-medium"
                    >
                      <SheetClose>
                        <p className="text-start">{item?.product}</p>
                      </SheetClose>
                    </Link>
                    <p className="text-muted-foreground text-xs">
                      Colour: {item?.color}, Size: {item?.size}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                        >
                          <MinusIcon className="h-5 w-5" />
                        </button>
                        <span>{item?.quantity}</span>
                        <button
                          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <span className="font-medium">
                        Rs {item?.price * item?.quantity}
                      </span>
                      <button
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 absolute top-0 right-0"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <XIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-6">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">
                  Rs{" "}
                  {cartItems?.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                  /-
                </span>
              </div>
              <Button className="w-full mt-4" onClick={handleCheckout}>
                Checkout
              </Button>
              <Button
                className="w-full mt-4 border"
                onClick={handleClearCart}
                variant={"destructive"}
              >
                Clear Cart
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <form onSubmit={handleDialogSubmit}>
            <h2 className="text-lg font-medium">Confirm your details</h2>
            <p>
              We will contact you to confirm your order and share payment
              related details.
            </p>
            <div className="mt-4">
              <label className="block text-sm font-medium">Name</label>
              <Input
                type="text"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Phone</label>
              <Input
                type="number"
                min="1000000000"
                max="9999999999"
                value={userDetails.phone}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, phone: e.target.value })
                }
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium">Address</label>
              <Textarea
                value={userDetails.address}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, address: e.target.value })
                }
                required
              />
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Checking out..." : "Confirm and Checkout"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        className="overflow-auto"
        open={billDialogOpen}
        onOpenChange={setBillDialogOpen}
      >
        <DialogContent className="max-w-3xl overflow-auto max-h-screen">
          {checkoutDetails && (
            <BillV0
              companyLogo={globalData?.logoUrl}
              companyName={globalData?.companyName}
              companyAddress={globalData?.address}
              companyPhone={globalData?.phones[0]}
              companyEmail={globalData?.emails[0]}
              buyerAddress={checkoutDetails?.userDetails?.address}
              buyerName={checkoutDetails?.userDetails?.name}
              buyerPhone={checkoutDetails?.userDetails?.phone}
              items={checkoutDetails?.cartItems}
              invoiceId={checkoutDetails?.id}
              gstNumber={globalData?.gstNumber}
              dateIssued={new Date().toLocaleString("en-IN")}
            />
          )}
        </DialogContent>
      </Dialog>
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
