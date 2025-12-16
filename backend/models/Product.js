import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  namaProduk: { type: String, required: true },
  harga: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  deskripsi: String,
  design3D: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Design3D",
    required: false // ✅ optional
  },
  gambar : [{type: String, required: true}]
});

export default mongoose.model("Product", productSchema);
