import mongoose from "mongoose";

const postalCodeSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  District: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: false }, // Foreign Key - Optional
});

export default mongoose.model("PostalCode", postalCodeSchema);