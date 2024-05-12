import User from "@/model/User";
import connectDB from "@/lib/connectDB";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  await connectDB();
  const { user } = await getSession();
  const { name, age } = req.body;

  const person = new Item({
    owner: user.email,
    name: name,
    age: age,
  });
  await person.save();
  console.log("inside api", name, age);
  res.status(200).json({ done: true });
}
