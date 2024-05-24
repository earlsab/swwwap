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

  const res = await req.json();
  console.log(res);
  const {
    id,
    title,
    description,
    brand,
    yearsOfOwnership,
    rfs,
    price,
    imageUrl,
  } = res;

  // Find the existing item by some identifier, e.g., item ID
  //   console.log(req.query);
  //   const itemId = req.query._id; // Assuming you have the item ID in the request query

  const existingItem = await Item.findById(id);

  // Check if the user is the owner of the item
  console.log(existingItem);
  console.log(user.email);
  if (existingItem.owner !== user.email) {
    return NextResponse.json(
      { message: "You are not authorized to edit this item." },
      { status: 500 }
    );
  }

  // Update the existing item with the new values
  existingItem.title = title;
  existingItem.description = description;
  existingItem.brand = brand;
  existingItem.yearsOfOwnership = yearsOfOwnership;
  existingItem.rfs = rfs;
  existingItem.price = price;
  existingItem.imageUrl = imageUrl;

  // Save the updated item
  const updatedItem = await existingItem.save();
  return NextResponse.json({ protected: updatedItem }, res);
});
