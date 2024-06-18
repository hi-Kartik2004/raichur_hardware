"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  orderBy,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useSession } from "next-auth/react";
import globalData from "@/app/data";
import dynamic from "next/dynamic";

const BillV0 = dynamic(() => import("@/components/component/bill-v0"), {
  ssr: false,
});

function MyOrders() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const [checkouts, setCheckouts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [adminMessage, setAdminMessage] = useState("");

  useEffect(() => {
    async function fetchCheckouts() {
      const ref = collection(db, "checkouts");
      const q = query(
        ref,
        where("email", "==", userEmail),
        orderBy("timestamp", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCheckouts(data);
    }

    if (userEmail) {
      fetchCheckouts();
    }
  }, [userEmail]);

  async function handleStatusChange(id, newStatus) {
    const checkoutRef = doc(db, "checkouts", id);
    try {
      await updateDoc(checkoutRef, { status: newStatus, adminMessage });
      setCheckouts((prevCheckouts) =>
        prevCheckouts.map((checkout) =>
          checkout.id === id ? { ...checkout, status: newStatus } : checkout
        )
      );
      toast({
        title: "Status updated successfully",
        description: `Checkout ${id} status updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const filteredCheckouts = checkouts.filter((checkout) => {
    if (statusFilter === "all") return true;
    return checkout.status === statusFilter;
  });

  const sortedCheckouts = [...filteredCheckouts].sort((a, b) => {
    const totalQuantityA = a.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalQuantityB = b.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    if (sortOrder === "increasing") {
      return totalQuantityA - totalQuantityB;
    } else if (sortOrder === "decreasing") {
      return totalQuantityB - totalQuantityA;
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-4 pb-16 pt-24">
      <Toaster />
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">My orders</h1>
        <div className="flex gap-4">
          <Select onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setSortOrder}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by Quantity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Sorting</SelectItem>
              <SelectItem value="increasing">Increasing</SelectItem>
              <SelectItem value="decreasing">Decreasing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Checkout id</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bill Details</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Admin Message (if any)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCheckouts.map((checkout) => (
              <TableRow key={checkout?.id}>
                <TableCell className="max-w-[110px] min-w-[110px] break-all">
                  {checkout?.id}
                </TableCell>
                <TableCell>
                  {checkout.cartItems.slice(0, 3).map((item, index) => (
                    <span key={item.id}>
                      {item.product}
                      {index < 2 && index < checkout.cartItems.length - 1
                        ? ", "
                        : ""}
                    </span>
                  ))}
                  {checkout.cartItems.length > 3 && (
                    <span> (+{checkout.cartItems.length - 3} more)</span>
                  )}
                </TableCell>
                <TableCell>
                  {checkout.cartItems.slice(0, 3).map((item, index) => (
                    <Link href={`/product/${item?.productId}`}>
                      <img
                        key={item?.id}
                        src={item?.imageUrl}
                        alt={item?.product}
                        className="h-10 w-10 inline-block ml-2"
                      />
                    </Link>
                  ))}
                  {checkout.cartItems.length > 3 && (
                    <span className="ml-2">
                      (+{checkout.cartItems.length - 3} more)
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {checkout.cartItems.reduce(
                    (sum, item) => +(sum + +item.quantity),
                    0
                  )}
                </TableCell>
                <TableCell>Rs {checkout?.totalAmount}</TableCell>
                <TableCell>
                  {new Date(checkout?.timestamp?.seconds * 1000).toLocaleString(
                    "en-IN"
                  )}
                </TableCell>
                <TableCell>
                  {checkout?.status == "pending"
                    ? "Contact for confirmation pending"
                    : checkout?.status}
                </TableCell>
                <TableCell>
                  <Dialog className="overflow-auto">
                    <DialogTrigger asChild>
                      <Button variant="outline">View Bill</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl overflow-auto max-h-screen">
                      <BillV0
                        companyLogo={globalData?.logoUrl}
                        companyName={globalData?.companyName}
                        companyAddress={globalData?.address}
                        companyPhone={globalData?.phones[0]}
                        companyEmail={globalData?.emails[0]}
                        buyerAddress={checkout?.userDetails?.address}
                        buyerName={checkout?.userDetails?.name}
                        buyerPhone={checkout?.userDetails?.phone}
                        items={checkout?.cartItems}
                        invoiceId={checkout?.id}
                        gstNumber={globalData?.gstNumber}
                        dateIssued={new Date(
                          checkout?.timestamp?.seconds * 1000
                        ).toLocaleString("en-IN")}
                      />
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[500px] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Checkout Details</DialogTitle>
                        <DialogDescription>
                          Detailed information about the products in this
                          checkout.
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        {checkout.cartItems.map((item) => (
                          <>
                            <div key={item.id} className="mb-4">
                              <div className="flex gap-2">
                                <Link href={`/product/${item?.productId}`}>
                                  <img
                                    src={item.imageUrl}
                                    alt={item.product}
                                    className="h-20 w-20 object-cover rounded"
                                  />
                                </Link>
                                <div className="font-semibold">
                                  <Link href={`/product/${item?.productId}`}>
                                    {item?.product}
                                  </Link>

                                  <div className="font-medium">
                                    <div className="flex justify-between gap-2 flex-wrap text-sm mt-1">
                                      <p>Quantity: {item.quantity}</p>
                                      <p>Price: Rs {item.price}</p>
                                    </div>

                                    <div className="flex justify-between gap-2 flex-wrap text-sm mt-1">
                                      <p>Color: {item?.color}</p>
                                      <p>Size:{item?.size}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Separator className="mb-6" />
                          </>
                        ))}
                      </div>
                      <p>Incase of any queries</p>
                      <div className={"flex flex-col"}>
                        <div className="flex gap-2 justify-start">
                          <Button asChild>
                            <Link href="/contact">Contact Us</Link>
                          </Button>

                          <Button asChild variant="outline">
                            <Link href={`tel:${globalData?.phones[0]}`}>
                              Call Us
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  {checkout.adminMessage
                    ? checkout.adminMessage
                    : "We will contact you to confirm your order and share payment details"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default MyOrders;
