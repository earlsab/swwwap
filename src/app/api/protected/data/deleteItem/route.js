import connectDB from "@/lib/connectDB";
import { items } from "@/lib/data";
import Item from "@/model/Item";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const DELETE = withApiAuthRequired(async function deleteItem(req, res) {
  const { user } = await getSession();
  // if (!user) {
  //   res.status(404).json();
  //   return;
  // }
  await connectDB();
  const urlParams = new URLSearchParams(req.url.split("?")[1]);
  const id = urlParams.get("id");

  const existingItem = await Item.findById(id);

  console.log("19"); // Find the existing item by some identifier, e.g., item ID
  // Check if the user is the owner of the item
  if (existingItem.owner !== user.email) {
    return NextResponse.json(
      { message: "You are not authorized to delete this item." },
      { status: 500 }
    );
  }

  // Delete the item
  console.log("28"); // Find the existing item by some identifier, e.g., item ID
  // await existingItem.remove({ _id: id });
  await Item.deleteOne({ _id: id });

  console.log("33"); // Find the existing item by some identifier, e.g., item ID
  return NextResponse.json({ message: "Item deleted successfully." }, res);
});
