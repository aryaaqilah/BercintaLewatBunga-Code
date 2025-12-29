import mongoose from "mongoose";

const provinceSchema = new mongoose.Schema({
  provinsi_id: { type: Number, required: true, unique: true },
  provinsi_name: { type: String, required: true }
});

export default mongoose.model("Province", provinceSchema);