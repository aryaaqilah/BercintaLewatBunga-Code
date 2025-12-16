import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Percentage: { type: Number, required: true },
  Maximum: { type: Number, required: true },
});

export default mongoose.model("Discount", discountSchema);