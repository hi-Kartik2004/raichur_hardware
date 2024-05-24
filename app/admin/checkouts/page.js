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

function Checkouts() {
  const [checkouts, setCheckouts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [adminMessage, setAdminMessage] = useState("");

  useEffect(() => {
    async function fetchCheckouts() {
      const ref = collection(db, "checkouts");
      const q = query(ref, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCheckouts(data);
    }

    fetchCheckouts();
  }, []);

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
    const matchesStatus =
      statusFilter === "all" || checkout.status === statusFilter;
    const matchesPhone =
      phoneFilter === "" || checkout?.userDetails?.phone.includes(phoneFilter);
    const matchesId = idFilter === "" || checkout.id.includes(idFilter);
    return matchesStatus && matchesPhone && matchesId;
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
    <div className="container mx-auto px-4 py-16">
      <Toaster />
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Checkout Details</h1>
        <div className="flex gap-4 flex-wrap">
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
          <Input
            type="text"
            placeholder="Filter by Phone"
            value={phoneFilter}
            onChange={(e) => setPhoneFilter(e.target.value)}
            className="w-full md:w-[200px]"
          />
          <Input
            type="text"
            placeholder="Filter by ID"
            value={idFilter}
            onChange={(e) => setIdFilter(e.target.value)}
            className="w-full md:w-[200px]"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Quantity</TableHead>
              {/* <TableHead>Price</TableHead> */}
              <TableHead>Total Amount</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCheckouts.map((checkout) => (
              <TableRow key={checkout.id}>
                <TableCell className="max-w-[110px] min-w-[110px] break-all">
                  <p>{checkout.id}</p>
                </TableCell>
                <TableCell>{checkout?.userDetails?.name}</TableCell>
                <TableCell>{checkout.email}</TableCell>
                <TableCell>{checkout?.userDetails?.phone}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <Button variant={"outline"}>Address</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <h3 className={"text-lg font-semibold"}>Address</h3>
                      {checkout?.userDetails?.address}
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  {checkout.cartItems.slice(0, 2).map((item, index) => (
                    <span key={item.id}>
                      {item.product}
                      {index < 1 && index < checkout.cartItems.length - 1
                        ? ", "
                        : ""}
                    </span>
                  ))}
                  {checkout.cartItems.length > 2 && (
                    <span> (+{checkout.cartItems.length - 2} more)</span>
                  )}
                </TableCell>
                <TableCell>
                  {checkout.cartItems.slice(0, 3).map((item, index) => (
                    <img
                      key={item.id}
                      src={item.imageUrl}
                      alt={item.product}
                      className="h-10 w-10 inline-block ml-2"
                    />
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
                {/* <TableCell>
                  {checkout.cartItems.map((item) => (
                    <div key={item.id}>{item.price}</div>
                  ))}
                </TableCell> */}
                <TableCell>Rs {checkout.totalAmount}</TableCell>
                <TableCell>
                  {new Date(checkout.timestamp.seconds * 1000).toLocaleString()}
                </TableCell>
                <TableCell>{checkout.status}</TableCell>
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
                                <img
                                  src={item.imageUrl}
                                  alt={item.product}
                                  className="h-20 w-20 object-cover rounded"
                                />
                                <div className="font-semibold">
                                  <Link href={`/product/${item.productId}`}>
                                    {item.product}
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
                      <div className="mt-4">
                        <label htmlFor="adminMessage" className="block mb-2">
                          Admin Message:
                        </label>
                        <Input
                          id="adminMessage"
                          value={adminMessage}
                          onChange={(e) => setAdminMessage(e.target.value)}
                          placeholder="Enter a message for this checkout"
                          className="w-full"
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          variant="secondary"
                          onClick={() =>
                            handleStatusChange(checkout.id, "completed")
                          }
                        >
                          Mark as Completed
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() =>
                            handleStatusChange(checkout.id, "cancelled")
                          }
                        >
                          Cancel
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Checkouts;
