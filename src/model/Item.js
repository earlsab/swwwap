import mongoose from "mongoose";

const Item = mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Item || mongoose.model("Item", Item);
