// models/ItemView.js
import mongoose from "mongoose";

const ItemViewSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    owner: String,
    title: String,
    description: String,
    brand: String,
    yearsOfOwnership: Number,
    rfs: String,
    imageUrl: String,
    price: Number,
    itemSellingStatus: Number,
    createdAt: Date,
    updatedAt: Date,
    __v: Number,
    averagePrice: Number,
    priceStatus: String,
  },
  {
    // Set collection name to match your view's name
    collection: "itemsWithMP", // Replace 'your_view_name' with the actual view name
  }
);

const ItemView =
  mongoose.models.ItemView || mongoose.model("ItemView", ItemViewSchema);
export default ItemView;
