import mongoose from "mongoose";

// === FLOWER SCHEMA ===
const FlowerSchema = new mongoose.Schema({
  type: {
    type: String, // contoh: "tulip", "rose", "lily"
    required: true,
  },
  modelPath: {
    type: String,
    required: true,
  },
  position: {
    type: [Number], // [x, y, z]
    required: true,
  },
  rotation: {
    type: [Number], // [x, y, z]
    default: [0, 0, 0],
  },
  scale: {
    type: [Number], // [x, y, z]
    default: [1, 1, 1],
  },
});

// Middleware: otomatis isi modelPath berdasarkan type
FlowerSchema.pre("validate", function (next) {
  if (this.type && !this.modelPath) {
    this.modelPath = `/models/${this.type}.glb`;
  }
  next();
});

// === WRAPPER SCHEMA ===
// disesuaikan: sekarang wrapper terdiri dari dua bagian: parcels & ribbon
const WrapperSchema = new mongoose.Schema({
  modelPath: {
    type: String,
    default: "/models/wrapper.glb",
  },
  parcelColor: {
    type: String,
    default: "#ffc0cb", // warna default parcels
  },
  ribbonColor: {
    type: String,
    default: "#ff0000", // warna default ribbon
  },
  position: {
    type: [Number],
    default: [0, 0, 0],
  },
  rotation: {
    type: [Number],
    default: [0, 0, 0],
  },
});

// === CARD SCHEMA ===
const CardSchema = new mongoose.Schema({
  modelPath: {
    type: String,
    default: "/models/card.glb",
  },
  color: {
    type: String,
    default: "#ffffff",
  },
  text: {
    type: String,
    default: "",
  },
  position: {
    type: [Number],
    default: [0, 0.2, 0],
  },
  rotation: {
    type: [Number],
    default: [0, 0, 0],
  },
});

// === DESIGN 3D SCHEMA ===
const Design3DSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // dibuat opsional sementara
    },
    flowers: [FlowerSchema],
    wrapper: WrapperSchema,
    card: CardSchema,
    question: { type: String, default: "" },
    answer: { type: String, default: "" }, 
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Design3D", Design3DSchema);
