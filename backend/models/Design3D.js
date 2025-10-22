import mongoose from "mongoose";

const flowerSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    z: Number,
    type: String, // jenis bunga
});

const design3DSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  flowers: [flowerSchema],
  wrapperColor: { type: String },
  cardColor: { type: String },
  cardText: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Design3D", design3DSchema);
