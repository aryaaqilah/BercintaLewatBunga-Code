import mongoose from "mongoose";

const threeDModelSchema = new mongoose.Schema({
  Path: { type: String, required: true },
  Question: { type: String, required: false },
  Answer: { type: String, required: false },
});

export default mongoose.model("3DModel", threeDModelSchema);