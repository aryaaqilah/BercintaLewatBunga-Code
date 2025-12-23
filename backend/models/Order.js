import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  Status: { type: Number, required: true },
  Address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  Delivery: { type: mongoose.Schema.Types.ObjectId, ref: 'Delivery', required: true },
  Product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  Notes: { type: String, required: false },
  ProductPrice: { type: Number, required: true },
  AdministrationFee: { type: mongoose.Schema.Types.ObjectId, ref: 'AdministrationFee', required: true },
  Discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount', required: false },
  Total: { type: Number, required: true },
});

export default mongoose.model("Order", orderSchema);