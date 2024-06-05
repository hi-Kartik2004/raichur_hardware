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

function MyOrders() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  const [checkouts, setCheckouts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [adminMessage, setAdminMessage] = useState("");
  const [BillV0, setBillV0] = useState(null);
  const [html2pdf, setHtml2pdf] = useState(null);

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

    fetchCheckouts();
  }, [userEmail]);

  useEffect(() => {
    async function loadBillComponent() {
      const { BillV0 } = await import("@/components/component/bill-v0");
      const html2pdf = await import("html2pdf.js");
      setBillV0(() => BillV0);
      setHtml2pdf(() => html2pdf);
    }

    if (typeof window !== "undefined") {
      loadBillComponent();
    }
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
                    <img
                      key={item?.id}
                      src={item?.imageUrl}
                      alt={item?.product}
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
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Bill</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl overflow-auto max-h-screen">
                      {BillV0 && (
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
                          totalAmount={checkout?.totalAmount}
                          gstRate={globalData?.gst}
                          shippingCharge={globalData?.shippingCharge}
                          paidAmount={checkout?.totalAmount}
                          deliveryDate={new Date(
                            checkout?.timestamp?.seconds * 1000
                          ).toLocaleString("en-IN")}
                          paymentMode={checkout?.paymentMode}
                          id={checkout?.id}
                          status={checkout?.status}
                          timestamp={checkout?.timestamp}
                        />
                      )}
                      <div className="mt-4 flex justify-end">
                        <Button
                          variant="default"
                          onClick={() => {
                            const element =
                              document.getElementById("bill-component");
                            if (element && html2pdf) {
                              html2pdf()
                                .set({
                                  margin: 1,
                                  filename: `invoice_${checkout?.id}.pdf`,
                                  image: { type: "jpeg", quality: 0.98 },
                                  html2canvas: { scale: 2 },
                                  jsPDF: {
                                    unit: "in",
                                    format: "letter",
                                    orientation: "portrait",
                                  },
                                })
                                .from(element)
                                .save();
                            }
                          }}
                        >
                          Download PDF
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  {checkout?.status == "pending" ? (
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        onClick={() =>
                          handleStatusChange(checkout?.id, "completed")
                        }
                      >
                        Mark as completed
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleStatusChange(checkout?.id, "cancelled")
                        }
                      >
                        Mark as cancelled
                      </Button>
                    </div>
                  ) : (
                    "No action required"
                  )}
                </TableCell>
                <TableCell>
                  {checkout?.status == "pending" ? (
                    <Input
                      placeholder="Leave a message..."
                      value={adminMessage}
                      onChange={(e) => setAdminMessage(e.target.value)}
                    />
                  ) : (
                    checkout?.adminMessage
                  )}
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
