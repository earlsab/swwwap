import mongoose from "mongoose";

const Item = mongoose.Schema(
  {
    owner: String,
    title: String,
    description: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Item || mongoose.model("Item", Item);
