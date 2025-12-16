import mongoose from "mongoose";

const componentSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Price: { type: Number, required: true },
  Asset: { type: String, required: true },
});

export default mongoose.model("Component", componentSchema);