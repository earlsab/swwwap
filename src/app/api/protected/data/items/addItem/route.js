export default withApiAuthRequired(async function POST(req) {
  //TODO: remove logs
  console.log(req);
  const { user } = await getSession();
  if (!user) {
    res.status(404).json;
    return;
  }
  await connectDB();

  const res = await req.json(); // res now contains body
  console.log(res);
  const { title, description, price } = res;

  const item = new Item({
    owner: user.email,
    title: title,
    description: description,
    price: price,
  });
  await item
    .save()
    .then(() => {
      console.log("Item saved successfully", title, description, price);
      return new Response();
    })
    .catch((error) => {
      console.error("Error saving item:", error);
    });
});
