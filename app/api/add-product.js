import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      const docRef = await addDoc(collection(db, "products"), {
        ...data,
        timestamp: Date.now(),
      });
      res.status(200).json({ success: true, docId: docRef.id });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
