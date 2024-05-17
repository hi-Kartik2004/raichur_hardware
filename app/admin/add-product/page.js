import { AddProductPageV0 } from "@/components/component/add-product-page-v0";
import { db } from "@/firebase/config";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React from "react";

async function page() {
  async function getAllCategories() {
    "use server";
    const q = query(collection(db, "categories"));
    const snapshot = await getDocs(q);
    let data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  }

  const categories = await getAllCategories();

  async function getImageUrl(categoryImage) {
    "use server";
    if (!categoryImage) return null;

    const storageRef = ref(storage, `productImages/${categoryImage.name}`);
    const snapshot = await uploadBytes(storageRef, categoryImage);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }

  async function addProductToFirebase({ data }) {
    "use server";
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

  async function isProductAlreadyCreated(productName) {
    "use server";
    const q = query(
      collection(db, "products"),
      where("name", "==", productName)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return { resp: false, message: "Product not found" };
    }
    return { resp: true, message: "Product " + productName + " exists" };
  }

  return (
    <div>
      <AddProductPageV0
        categories={categories}
        addProductToFirebaseFunction={addProductToFirebase}
        getImageUrlFunction={getImageUrl}
        isProductAlreadyCreatedFunction={isProductAlreadyCreated}
      />
    </div>
  );
}

export default page;
