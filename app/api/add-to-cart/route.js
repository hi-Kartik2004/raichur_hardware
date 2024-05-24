import { auth } from "@/auth";
import { db } from "@/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  // const productName = req.query.productName;
  console.log(req.url);
  return new NextResponse(200, { success: true });
}

export async function POST(req) {
  const session = await auth();
  const {
    productName = "",
    price = 0,
    quantity = 0,
    imageUrl = "",
    productId = "",
    color = "",
    size = "",
  } = await req.json();
  const ref = collection(db, "cart");
  try {
    const snapshot = await addDoc(ref, {
      userEmail: session.user.email,
      product: productName,
      price: price,
      quantity: quantity,
      imageUrl: imageUrl,
      timestamp: serverTimestamp(),
      productId: productId,
      color: color,
      size: size,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(500, { success: false });
  }

  return new NextResponse(200, { success: true });
}
