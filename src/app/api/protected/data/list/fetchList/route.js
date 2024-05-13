// Some code from Copilot
import connectDB from "@/lib/connectDB";
import Item from "@/model/Item";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
// import connectDB from "src/lib/connectDB.js";

export const GET = withApiAuthRequired(async function fetchItems(req) {
  const res = new NextResponse();
  const { user } = await getSession(req, res);
  await connectDB();
  const items = await Item.find({});
  return NextResponse.json({ protected: items }, res);
});
