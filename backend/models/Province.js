import mongoose from "mongoose";

const provinceSchema = new mongoose.Schema({
  provinsi_name: { type: String, required: true }
});

export default mongoose.model("Province", provinceSchema);