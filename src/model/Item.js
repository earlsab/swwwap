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
    itemStatus: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Item || mongoose.model("Item", Item);
