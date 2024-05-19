import { auth } from "@/auth";
import { db } from "@/firebase/config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { OK } from "zod";

export async function GET(req, res) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return { status: 401, data: { message: "Unauthorized" } };
  }

  const q = query(
    collection(db, "cart"),
    where("userEmail", "==", email),
    orderBy("timestamp", "desc")
  );
  try {
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ data });
  } catch (err) {
    console.error(err);
    return NextResponse.error(
      JSON.stringify({ message: "Internal Server Error" })
    );
  }
}
