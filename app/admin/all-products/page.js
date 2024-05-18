import { AllProductsTableV0 } from "@/components/component/all-products-table-v0";
import { db } from "@/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import React from "react";

async function AllProducts() {
  async function getAllProducts() {
    const ref = collection(db, "products");
    const q = query(ref, orderBy("timestamp", "desc")); // Order by timestamp in descending order

    const snapshot = await getDocs(q);

    let data = [];
    snapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
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

  async function deleteProduct(id) {
    "use server";
    console.log("deleteProduct: ", id);
    let resp = {};
    await deleteDoc(doc(db, "products", id))
      .then(() => {
        resp = {
          resp: true,
          message: "Product deleted successfully",
        };
      })
      .catch((error) => {
        resp = {
          resp: false,
          message: "Error deleting product: ",
          error,
        };
      });

    return resp;
  }

  const data = await getAllProducts();
  const categories = await getAllCategories();
  console.log("categories: ", categories);

  return (
    <div className="pt-12">
      <AllProductsTableV0
        products={data}
        categories={categories}
        deleteProductFunction={deleteProduct}
      />
    </div>
  );
}

export default AllProducts;
