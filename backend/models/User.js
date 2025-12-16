import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" }
});

export default mongoose.model("User", userSchema);
