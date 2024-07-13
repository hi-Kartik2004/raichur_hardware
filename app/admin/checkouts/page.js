"use client";
import React, { useState, useEffect, useRef } from "react";
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
import globalData from "@/app/data";
import dynamic from "next/dynamic";
import AddToCartButton from "@/components/AddToCartButton";
import { Textarea } from "@/components/ui/textarea";

const BillV0 = dynamic(() => import("@/components/component/bill-v0"), {
  ssr: false,
});

function Checkouts() {
  const [checkouts, setCheckouts] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isUserDetailsDialogOpen, setIsUserDetailsDialogOpen] = useState(false);
  const addToCartRefs = useRef({});

  useEffect(() => {
    async function fetchCheckouts() {
      const ref = collection(db, "checkouts");
      const q = query(ref, orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Initialize userDetails state with data from checkouts
      const initialUserDetails = {};
      data.forEach((checkout) => {
        initialUserDetails[checkout.id] = {
          name: checkout?.userDetails?.name || "",
          phone: checkout?.userDetails?.phone || "",
          address: checkout?.userDetails?.address || "",
        };
      });
      setUserDetails(initialUserDetails);

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

  const handleAddAllToCart = (checkoutId) => {
    const addToCartButtons = addToCartRefs.current[checkoutId];
    if (addToCartButtons) {
      addToCartButtons.forEach((button) => {
        if (button && button.addToCart) {
          button.addToCart();
        }
      });
    }
  };

  const handleSaveUserDetails = async (e, checkoutId) => {
    e.preventDefault();
    setIsSaving(true);
    const checkoutRef = doc(db, "checkouts", checkoutId);
    try {
      await updateDoc(checkoutRef, { userDetails: userDetails[checkoutId] });
      setCheckouts((prevCheckouts) =>
        prevCheckouts.map((checkout) =>
          checkout.id === checkoutId
            ? { ...checkout, userDetails: userDetails[checkoutId] }
            : checkout
        )
      );
      toast({
        title: "User details updated successfully",
        description: `Checkout ${checkoutId} user details updated`,
      });
    } catch (error) {
      toast({
        title: "Error updating user details",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e, checkoutId) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [checkoutId]: {
        ...prevDetails[checkoutId],
        [name]: value,
      },
    }));
  };

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
              <TableHead>Bill Details</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>User Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCheckouts.map((checkout) => {
              // Initialize the ref for the current checkout if it doesn't exist
              if (!addToCartRefs.current[checkout.id]) {
                addToCartRefs.current[checkout.id] = [];
              }

              return (
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
                        <Button variant={"outline"}>View Bill</Button>
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
                  <TableCell>Rs {checkout.totalAmount}</TableCell>
                  <TableCell>
                    {new Date(
                      checkout.timestamp.seconds * 1000
                    ).toLocaleString()}
                  </TableCell>
                  <TableCell>{checkout.status}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="secondary">View Details</Button>
                      </DialogTrigger>
                      <DialogContent className="max-h-[500px] overflow-y-auto max-w-lg">
                        <DialogHeader>
                          <DialogTitle>Checkout Details</DialogTitle>
                          <DialogDescription>
                            Detailed information about the products in this
                            checkout.
                          </DialogDescription>
                        </DialogHeader>
                        <div>
                          {checkout.cartItems.map((item, index) => (
                            <React.Fragment key={item.id}>
                              <div className="mb-4">
                                <div className="flex gap-2">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.product}
                                    className="h-20 w-20 object-cover rounded"
                                  />
                                  <div className="font-semibold w-full">
                                    <Link href={`/product/${item.productId}`}>
                                      {item.product}
                                    </Link>
                                    <div className="font-medium">
                                      <div className="flex justify-between gap-2 flex-wrap text-sm mt-1">
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: Rs {item.price}</p>
                                      </div>
                                      <div className="flex justify-between gap-2 flex-wrap text-sm mt-1 mb-1">
                                        <p>Color: {item?.color}</p>
                                        <p>Size:{item?.size}</p>
                                      </div>
                                      <AddToCartButton
                                        productName={item.product}
                                        price={item.price}
                                        quantity={item.quantity}
                                        imageUrl={item.imageUrl}
                                        productId={item.productId}
                                        color={item.color}
                                        size={item.size}
                                        discount={item.discount}
                                        ref={(el) => {
                                          if (el) {
                                            addToCartRefs.current[checkout.id][
                                              index
                                            ] = el;
                                          }
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Separator className="mb-6" />
                            </React.Fragment>
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
                        <DialogFooter className={"flex flex-wrap gap-2"}>
                          <Button
                            variant="destructive"
                            onClick={() =>
                              handleStatusChange(checkout.id, "cancelled")
                            }
                          >
                            Cancel
                          </Button>
                          <Button
                            className={"bg-green-700 hover:bg-green-800"}
                            onClick={() =>
                              handleStatusChange(checkout.id, "completed")
                            }
                          >
                            Mark as Completed
                          </Button>
                          <Button
                            onClick={() => handleAddAllToCart(checkout.id)}
                          >
                            Add all products to cart
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="secondary">User Details</Button>
                      </DialogTrigger>
                      <DialogContent>
                        {/* Render details in an edit form */}
                        <form
                          className="flex flex-col gap-2"
                          onSubmit={(e) =>
                            handleSaveUserDetails(e, checkout.id)
                          }
                        >
                          <label htmlFor="name" className="block">
                            Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={userDetails[checkout.id]?.name || ""}
                            onChange={(e) => handleInputChange(e, checkout.id)}
                          />
                          {/* <label htmlFor="email" className="block">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            value={userDetails[checkout.id]?.email}
                            onChange={(e) => handleInputChange(e, checkout.id)}
                          /> */}
                          <label htmlFor="phone" className="block">
                            Phone
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={userDetails[checkout.id]?.phone || ""}
                            onChange={(e) => handleInputChange(e, checkout.id)}
                          />
                          <label htmlFor="address">Address</label>
                          <Textarea
                            id="address"
                            name="address"
                            value={userDetails[checkout.id]?.address || ""}
                            onChange={(e) => handleInputChange(e, checkout.id)}
                          ></Textarea>

                          <Button type="submit" disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Checkouts;
