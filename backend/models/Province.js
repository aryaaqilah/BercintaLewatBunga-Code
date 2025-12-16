import mongoose from "mongoose";

const provinceSchema = new mongoose.Schema({
  Name: { type: String, required: true },
});

export default mongoose.model("Province", provinceSchema);