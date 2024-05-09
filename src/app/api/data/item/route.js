// Some code from Copilot
import connectDB from "@/lib/connectDB";
import Item from "@/model/Item";
// import connectDB from "src/lib/connectDB.js";

async function handler(req) {
  //TODO: remove logs
  console.log(req);
  await connectDB();
  const res = await req.json(); // res now contains body
  console.log(res);
  const { title, description, price } = res;

  const item = new Item({
    title: title,
    description: description,
    price: price,
  });
  await item.save();
  console.log("inside api", title, description, price);
  //   res.status(200).json({ done: true });
  return new Response("dsfdfsdf");
}

async function getAllItems() {
  await connectDB();
  const items = await Item.find({});
  return new Response(items);
}

export { handler as POST };
export { getAllItems as GET };
