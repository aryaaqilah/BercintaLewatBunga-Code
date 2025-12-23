import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  RecipientNumber: { type: String, required: true },
  RecipientName: { type: String, required: true },
  Province: { type: mongoose.Schema.Types.ObjectId, ref: 'Province', required: true },
  City: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  District: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true },
  PostalCode: { type: mongoose.Schema.Types.ObjectId, ref: 'PostalCode', required: true },
  Detail: { type: String, required: true }
});

export default mongoose.model("Address", addressSchema);