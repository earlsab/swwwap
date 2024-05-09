import connectDB from "@/lib/connectDB";
import Item from "@/model/Item";
// import connectDB from "src/lib/connectDB.js";

async function handler(req) {
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

export { handler as POST };
