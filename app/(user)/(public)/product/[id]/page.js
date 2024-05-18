import { auth } from "@/auth";
import { ProductPageV0 } from "@/components/component/product-page-v0";
import { db } from "@/firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";

async function ProductPage({ params }) {
  const productId = params.id;

  async function getProductDetails() {
    "use server";
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      return null;
    }
  }
  const session = await auth();
  async function checkIfAddedToCart() {
    if (!session) return [];
    const ref = collection(db, "cart");
    const q = query(ref, where("userEmail", "==", session.user.email));
    let data = [];
    try {
      const snapshot = await getDocs(q);
      data = [];
      const cartItems = snapshot.docs.map((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
    } catch (err) {
      console.error(err);
    }
    return data;
  }

  const data = await getProductDetails();
  const cartItems = await checkIfAddedToCart();
  const isAddedToCart = cartItems.length > 0;

  return (
    <div className="pt-20 md:pt-36">
      <ProductPageV0
        productId={params.id}
        product={data}
        isAddedToCart={isAddedToCart}
      />
    </div>
  );
}

export default ProductPage;
