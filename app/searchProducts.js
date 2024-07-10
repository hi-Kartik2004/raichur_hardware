import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

async function searchProducts(keyword) {
  const productsRef = collection(db, "products");
  const q = query(
    productsRef,
    where("search_keywords", "array-contains", keyword.toLowerCase())
  );
  const querySnapshot = await getDocs(q);

  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
}

export { searchProducts };
