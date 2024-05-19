import { ProductsPage } from "@/components/component/products-page";
import { db } from "@/firebase/config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React from "react";

async function Category({ params }) {
  const categoryName = decodeURIComponent(params.id);
  console.log(categoryName);

  // Function to get all products based on category name
  async function getAllCategoryProducts(categoryName) {
    "use server";
    let q;

    if (categoryName === "all") {
      // Query to get all products that are not hidden
      q = query(
        collection(db, "products"),
        where("hide", "==", false),
        orderBy("timestamp", "desc")
      );
    } else {
      // Query to get products of a specific category that are not hidden
      q = query(
        collection(db, "products"),
        where("category", "==", categoryName),
        where("hide", "==", false),
        orderBy("timestamp", "desc")
      );
    }

    const snapshot = await getDocs(q);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }

  // Function to get details of the specific category
  async function getCategoryDetails() {
    "use server";
    const q = query(
      collection(db, "categories"),
      where("categoryName", "==", categoryName)
    );
    const snapshot = await getDocs(q);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }

  // Function to get all categories
  async function getAllCategories() {
    "use server";
    const q = query(collection(db, "categories"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }

  // Fetch data for products, category details, and all categories
  const products = await getAllCategoryProducts(categoryName);
  const categoryDetails = await getCategoryDetails();
  const categories = await getAllCategories();

  return (
    <div className="pt-10 lg:pt-22">
      <ProductsPage
        categories={categories}
        initialProducts={products}
        categoryName={categoryName}
        categoryDetails={categoryDetails[0]}
      />
    </div>
  );
}

export default Category;
