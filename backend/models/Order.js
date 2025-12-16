import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
  },
],

  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" }, // 🏠 alamat pengiriman
  tanggal: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
  totalHarga: { type: Number, default: 0 }
});

export default mongoose.model("Order", orderSchema);
