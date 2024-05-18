import { ProductsPage } from "@/components/component/products-page";
import { db } from "@/firebase/config";
import {
  collection,
  doc,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import React from "react";

async function Category({ params }) {
  const categoryName = params.id;

  async function getAllCategoryProducts(categoryName) {
    "use server";
    // Query products collection and order by timestamp in descending order
    const q = query(
      collection(db, "products"),
      where("category", "==", categoryName),
      where("hide", "==", false),
      orderBy("timestamp", "desc")
    );

    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }

  async function getCategoryDetails() {
    "use server";
    const q = query(
      collection(db, "categories"),
      where("categoryName", "==", categoryName)
    );
    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }

  async function getAllCategories() {
    "use server";
    // Query categories collection and order by timestamp in descending order
    const q = query(collection(db, "categories"), orderBy("timestamp", "desc"));

    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return data;
  }

  const products = await getAllCategoryProducts(categoryName);
  const categoryDetails = await getCategoryDetails();
  const categories = await getAllCategories();
  // const temp = await getProducts("Q3bBsszsfpj0GO9KVBb3", "testing", 12);
  // console.log("temp", temp.length);
  // console.log(products);

  return (
    <div className="pt-20 lg:pt-28 xl:pt-32">
      <ProductsPage
        categories={categories}
        initialProducts={products}
        categoryName={params.id}
        categoryDetails={categoryDetails[0]}
        // getProducts={getProducts}
      />
    </div>
  );
}

export default Category;
