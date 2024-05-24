// Some code from Copilot
import connectDB from "@/lib/connectDB";
import Item from "@/model/Item";
import ItemView from "@/model/ItemWithMP";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
// import connectDB from "src/lib/connectDB.js";

export const GET = withApiAuthRequired(async function fetchItems(req) {
  // TODO: Stack Filters and Sorts
  let items;
  const res = new NextResponse();
  await connectDB();
  const { searchParams } = new URL(req.url);

  const filterOutSelf = searchParams.get("filterOutSelf");
  const filterByBrand = searchParams.get("filterByBrand");
  const filterByOwner = searchParams.get("filterByOwner");
  const filterByPrice = parseInt(searchParams.get("filterByPrice"));
  const sortByNew = searchParams.get("sortBy");

  let query = { _id: { $ne: filterOutSelf } };

  if (filterByBrand) {
    query = { ...query, brand: filterByBrand };
  }

  // Show everthing if owner, show only unsold if not
  if (filterByOwner) {
    query = { ...query, owner: filterByOwner };
  } else {
    query = { ...query, itemSellingStatus: { $ne: 0 } }; // exclude sold items
  }

  const range = filterByPrice * 0.25; // get 10 percent
  const upperLimit = filterByPrice + range;
  const lowerLimit = filterByPrice - range;
  console.log(filterByPrice, upperLimit, lowerLimit);
  if (filterByPrice) {
    query = { ...query, price: { $lte: upperLimit, $gte: lowerLimit } };
  }

  if (sortByNew == "createdDesc") {
    items = await ItemView.find({ ...query })
      .sort({ createdAt: -1 })
      .exec();
  } else {
    items = await ItemView.find({
      ...query,
    }).exec();
  }

  return NextResponse.json({ protected: items }, res);
});
