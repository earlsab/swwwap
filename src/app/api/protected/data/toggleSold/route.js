import connectDB from "@/lib/connectDB";
import { items } from "@/lib/data";
import Item from "@/model/Item";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const PUT = withApiAuthRequired(async function updateItem(req) {
  const { user } = await getSession();
  if (!user) {
    res.status(404).json();
    return;
  }
  await connectDB();
  const urlParams = new URLSearchParams(req.url.split("?")[1]);
  const id = urlParams.get("id");

  // Find the existing item by some identifier, e.g., item ID
  //   console.log(req.query);
  //   const itemId = req.query._id; // Assuming you have the item ID in the request query

  const existingItem = await Item.findById(id);

  // Check if the user is the owner of the item
  console.log(existingItem);
  if (existingItem.owner !== user.email) {
    return NextResponse.json(
      { message: "You are not authorized to edit this item." },
      { status: 500 }
    );
  }

  // Update the existing item with the new values
  if (existingItem.itemSellingStatus == 1) {
    existingItem.itemSellingStatus = 0;
  } else {
    existingItem.itemSellingStatus = 1;
  }
  // Save the updated item
  const updatedItem = await existingItem.save();
  return NextResponse.json({ protected: updatedItem }, res);
});
