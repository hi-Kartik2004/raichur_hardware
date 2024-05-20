"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import { Toaster } from "../ui/toaster";
import { toast } from "../ui/use-toast";
import { EditProductPageV0 } from "../EditProductPageV0";
import { ViewSectionsDialog } from "../ViewSectionsDialog";
import { db } from "@/firebase/config";

export function AllProductsTableV0({
  products,
  categories,
  deleteProductFunction,
}) {
  const router = useRouter();

  // State variables to manage filter options and pagination
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceOrder, setSelectedPriceOrder] = useState("");
  const [selectedInventoryStatus, setSelectedInventoryStatus] = useState("");
  const [productNameFilter, setProductNameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  // Function to handle delete
  async function handleDelete(id) {
    const resp = await deleteProductFunction(id);
    if (resp.resp) {
      toast({
        title: "Product deleted successfully",
        description: resp.message,
      });
      router.refresh();
    } else {
      toast({
        title: "Product not found",
        description: resp.message,
        variant: "destructive",
      });
    }
  }

  // Function to handle view sections
  function handleViewSections(id) {
    console.log("Show Sections", id);
  }

  // Function to handle edit
  function handleEdit(id) {
    console.log("Edit: ", id);
  }

  // Function to get image URL
  async function getImageUrl(categoryImage) {
    if (!categoryImage) return null;

    const storageRef = ref(storage, `productImages/${categoryImage.name}`);
    const snapshot = await uploadBytes(storageRef, categoryImage);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  // Function to add product to Firebase
  async function addProductToFirebase({ data }) {
    console.log(data);
    const ref = collection(db, "products");
    try {
      const doc = await addDoc(ref, {
        ...data,
      });

      return {
        resp: true,
        message: "Product added successfully",
        docId: doc,
      };
    } catch (error) {
      return {
        resp: false,
        message: error.message,
        docId: null,
      };
    }
  }

  // Function to check if product already exists
  async function isProductAlreadyCreated(productName) {
    const q = query(
      collection(db, "products"),
      where("name", "==", productName)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return { resp: false, message: "Product not found" };
    }
    return {
      resp: true,
      message: "Product " + productName + " already exists",
    };
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter products based on selected criteria
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }
    if (selectedInventoryStatus === "in-stock" && product.inventory <= 0) {
      return false;
    }
    if (selectedInventoryStatus === "out-of-stock" && product.inventory > 0) {
      return false;
    }
    // Filter by name
    if (
      productNameFilter &&
      !product.name.toLowerCase().includes(productNameFilter.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Sort filtered products based on price order
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (selectedPriceOrder === "low-to-high") {
      return a.price - b.price;
    } else if (selectedPriceOrder === "high-to-low") {
      return b.price - a.price;
    }
    return 0;
  });

  // Calculate index of the last product on current page
  const indexOfLastProduct = currentPage * productsPerPage;
  // Calculate index of the first product on current page
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // Get current products to display based on pagination
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(sortedProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <Toaster />
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">All Products Table</h1>
          <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
            <Select onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem
                    key={category.categoryName}
                    value={category.categoryName}
                  >
                    {category.categoryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedPriceOrder}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Filter by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low-to-high">Low to High</SelectItem>
                <SelectItem value="high-to-low">High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Select onValueChange={setSelectedInventoryStatus}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Filter by Inventory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
            <Input
              className="w-full max-w-[200px]"
              placeholder="Search by product name"
              type="search"
              value={productNameFilter}
              onChange={(e) => setProductNameFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Images</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead>Max Quantity</TableHead>
                <TableHead>Sections</TableHead>
                <TableHead>Actions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts.map((product) => (
                <TableRow key={product.name}>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.discount}%</TableCell>
                  <TableCell>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {product.images.map((image) => (
                        <img
                          alt="Product Image"
                          height={64}
                          key={image}
                          src={image}
                          style={{
                            aspectRatio: "64/64",
                            objectFit: "cover",
                          }}
                          width={64}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{product.inventory}</TableCell>
                  <TableCell>{product.maxQuantity}</TableCell>
                  <TableCell>
                    <ViewSectionsDialog product={product} />
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="secondary">Edit</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] w-full max-h-[650px] overflow-y-auto">
                        <EditProductPageV0
                          product={product}
                          categories={categories}
                          addProductToFirebaseFunction={addProductToFirebase}
                          getImageUrlFunction={getImageUrl}
                          isProductAlreadyCreatedFunction={
                            isProductAlreadyCreated
                          }
                        />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <div className="flex justify-center my-4 gap-2 items-center overflow-auto">
            pages
            {pageNumbers.map((number) => (
              <Button
                key={number}
                variant="secondary"
                className="border"
                onClick={() => paginate(number)}
              >
                {number}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
