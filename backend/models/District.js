import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  kecamatan_id: { type: Number, required: true, unique: true },
  kecamatan_name: { type: String, required: true },
  kabupaten_id: { type: Number, required: true }, // Foreign Key - Mandatory
});

export default mongoose.model("District", districtSchema);