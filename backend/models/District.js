import mongoose from "mongoose";

const districtSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  City: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true }, // Foreign Key - Mandatory
});

export default mongoose.model("District", districtSchema);