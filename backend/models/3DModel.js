import mongoose from "mongoose";

const threeDModelSchema = new mongoose.Schema({
  Path: { type: String, required: true },
  Question: { type: String, required: true },
  Answer: { type: String, required: true },
});

export default mongoose.model("3DModel", threeDModelSchema);