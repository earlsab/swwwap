import connectDB from "@/lib/connectDB";
import Item from "@/model/Item";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export const GET = withApiAuthRequired(async function fetchItems(req) {
  const res = new NextResponse();
  const { user } = await getSession(req, res);
  console.log(req);
  await connectDB();

  const urlParams = new URLSearchParams(req.url.split("?")[1]);
  const itemId = urlParams.get("id");
  const item = await Item.findById(itemId);
  const editableBool = item.owner === user.email;

  return NextResponse.json({ protected: item, isEditable: editableBool }, res);
});
