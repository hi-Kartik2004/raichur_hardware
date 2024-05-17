import { db } from "@/firebase/config";
import { collection, getDocs, query } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const q = query(collection(db, "categories"));
      const snapshot = await getDocs(q);
      const categories = snapshot.docs.map((doc) => doc.data());
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
