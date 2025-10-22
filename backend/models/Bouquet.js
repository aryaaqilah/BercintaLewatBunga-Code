import mongoose from "mongoose";

const flowerSchema = new mongoose.Schema({
  position: {
    x: Number,
    y: Number,
    z: Number,
  },
  type: String, // jenis bunga
});

const bouquetSchema = new mongoose.Schema({
  wrapperColor: String,
  cardText: String,
  flowers: [flowerSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Bouquet", bouquetSchema);
