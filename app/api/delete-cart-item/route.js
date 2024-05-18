// import necessary modules
import { db } from "@/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function DELETE(req, res) {
  // Ensure user is authenticated
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    return { status: 401, data: { message: "Unauthorized" } };
  }

  // Extract item id from request body
  const { itemId } = await req.json();

  console.log(itemId);

  try {
    // Construct reference to cart item document in Firestore
    const cartItemRef = doc(db, "cart", itemId);

    // Delete the cart item document
    await deleteDoc(cartItemRef);

    // Return success response
    return NextResponse.json(
      { message: "Deleted Item from cart successfully!" },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors
    console.error("Error deleting cart item:", error);
    return NextResponse.json(
      { message: "Error deleting cart item", error },
      { status: 500 }
    );
  }
}
