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
  const [selectedCheckout, setSelectedCheckout] = useState(null);
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
    if (statusFilter === "all") return true;
    return checkout.status === statusFilter;
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <Toaster />
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Checkout Details</h1>
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
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Email</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCheckouts.map((checkout) => (
              <TableRow key={checkout.id}>
                <TableCell>{checkout.email}</TableCell>
                <TableCell>
                  {checkout.cartItems[0].product} ({checkout.cartItems.length})
                </TableCell>
                <TableCell>
                  {checkout.cartItems.map((item) => (
                    <div key={item.id}>
                      <img
                        src={item.imageUrl}
                        alt={item.product}
                        className="h-10 w-10 inline-block ml-2"
                      />
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {checkout.cartItems.map((item) => (
                    <div key={item.id}>{item.quantity}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {checkout.cartItems.map((item) => (
                    <div key={item.id}>{item.price}</div>
                  ))}
                </TableCell>
                <TableCell>{checkout.totalAmount}</TableCell>
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
                              <div className="font-semibold">
                                <Link href={`/product/${item.productId}`}>
                                  {item.product}
                                </Link>
                              </div>
                              <img
                                src={item.imageUrl}
                                alt={item.product}
                                className="h-20 w-20 object-cover"
                              />
                              <div>Quantity: {item.quantity}</div>
                              <div>Price: Rs{item.price}</div>
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
