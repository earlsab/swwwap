import mongoose from "mongoose";

const Item = mongoose.Schema(
  {
    owner: String,
    title: String,
    description: String,
    brand: String,
    yearsOfOwnership: Number,
    rfs: String,
    imageUrl: String,
    price: Number,
    itemSellingStatus: Number, // 1 selling 0 sold
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Item || mongoose.model("Item", Item);
