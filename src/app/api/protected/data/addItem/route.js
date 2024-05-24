import connectDB from "@/lib/connectDB";
import Item from "@/model/Item";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const POST = withApiAuthRequired(async function addItem(req) {
  //TODO: remove logs

  const { user } = await getSession();
  if (!user) {
    res.status(404).json;
    return;
  }
  await connectDB();
  const res = await req.json();
  console.log(res);
  const { title, description, price, imageUrl, brand, yearsOfOwnership, rfs } =
    res;

  const item = new Item({
    owner: user.email,
    title: title,
    description: description,
    brand: brand,
    yearsOfOwnership: yearsOfOwnership,
    rfs: rfs,
    imageUrl: imageUrl,
    price: price,
    itemSellingStatus: 1, // default to selling
  });
  console.log(item);
  const itemtoSave = await item.save();
  return NextResponse.json({ protected: itemtoSave }, res);
});
