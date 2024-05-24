// Some code from Copilot
import connectDB from "@/lib/connectDB";
import Item from "@/model/Item";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
// import connectDB from "src/lib/connectDB.js";

export const GET = withApiAuthRequired(async function fetchItems(req) {
  let items;
  const res = new NextResponse();
  await connectDB();
  const { searchParams } = new URL(req.url);

  const filterByBrand = searchParams.get("filterByBrand");
  if (filterByBrand) {
    items = await Item.find({ brand: filterByBrand }).exec();
  }

  const filterByPrice = parseInt(searchParams.get("filterByPrice"));
  console.log(filterByPrice);
  const range = filterByPrice * 0.25; // get 10 percent

  const upperLimit = filterByPrice + range;
  const lowerLimit = filterByPrice - range;
  console.log(filterByPrice, upperLimit, lowerLimit);
  if (filterByPrice) {
    items = await Item.find({
      price: { $lte: upperLimit, $gte: lowerLimit },
    }).exec();
  }

  if (!filterByBrand && !filterByPrice) {
    items = await Item.find({});
  }
  return NextResponse.json({ protected: items }, res);
});
