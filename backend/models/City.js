import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  provinsi_id: { type: Number, required: true }, // Foreign Key - Mandatory
  kabupaten_id: { type: Number, required: true, unique: true },
  kabupaten_name: { type: String, required: true }
});

export default mongoose.model("City", citySchema);