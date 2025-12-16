import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  Name: { type: String, required: true },
  ProvinceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true }, // Foreign Key - Mandatory
});

export default mongoose.model("City", citySchema);