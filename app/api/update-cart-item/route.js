// File: /app/api/update-cart-item/route.js

import { auth } from "@/auth";
import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { itemId, quantity } = await req.json();

  try {
    const cartItemRef = doc(db, "cart", itemId);
    await updateDoc(cartItemRef, { quantity });
    return NextResponse.json({ message: "Cart item updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating cart item", error },
      { status: 500 }
    );
  }
}
