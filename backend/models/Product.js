import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Price: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  Image: { type: String, required: true },
  '3DModelId': { type: mongoose.Schema.Types.ObjectId, ref: '3DModel', required: false },
  Memo: { type: String, required: false },
  Items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: false }]
});

export default mongoose.model("Product", productSchema);