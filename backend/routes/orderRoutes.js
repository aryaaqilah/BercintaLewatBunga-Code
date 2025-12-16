import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Tambah order baru
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ambil semua order
router.get("/", async (req, res) => {
  const orders = await Order.find().populate("products user address");
  res.json(orders);
});

// Ambil order berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("products user address");
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
