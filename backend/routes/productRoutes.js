import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Tambah product baru
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ambil semua product
router.get("/", async (req, res) => {
  const products = await Product.find().populate("design3d");
  res.json(products);
});

// Ambil product berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("design3d");
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Hapus product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
