import mongoose from "mongoose";

const administrationFeeSchema = new mongoose.Schema({
  Fee: { type: Number, required: true, unique: true },
});

export default mongoose.model("AdministrationFee", administrationFeeSchema);