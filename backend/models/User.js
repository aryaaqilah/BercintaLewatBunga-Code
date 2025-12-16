import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: false }]
});

export default mongoose.model("User", userSchema);