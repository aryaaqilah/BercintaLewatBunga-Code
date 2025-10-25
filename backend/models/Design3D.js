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
const WrapperSchema = new mongoose.Schema({
  modelPath: {
    type: String,
    default: "/models/wrapper.glb",
  },
  color: {
    type: String,
    default: "#ffc0cb", // pink
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
    default: "#cccccc",
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
      required: true,
    },
    flowers: [FlowerSchema],
    wrapper: WrapperSchema,
    card: CardSchema,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Design3D", Design3DSchema);
