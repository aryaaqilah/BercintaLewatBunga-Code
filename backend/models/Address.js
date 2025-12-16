import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  jalan: { type: String, required: true },
  kota: { type: String, required: true },
  provinsi: { type: String, required: true },
  kodePos: { type: String, required: true },
  negara: { type: String, default: "Indonesia" }
});

export default mongoose.model("Address", addressSchema);
