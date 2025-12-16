import express from "express";
import Order from "../models/Order.js";

const router = express.Router();
const POPULATE_FIELDS = ['AddressId', 'DeliveryId', 'ProductId', 'AdministrationFee', 'DiscountId'];

// 📦 Buat Order Baru (POST /api/orders)
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 📜 Ambil Semua Order (GET /api/orders)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate(POPULATE_FIELDS);
    res.json(orders);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 🔎 Ambil Order Berdasarkan ID (GET /api/orders/:id)
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(POPULATE_FIELDS);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 📝 Update Order (PUT /api/orders/:id)
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate(POPULATE_FIELDS);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 💣 Hapus Order (DELETE /api/orders/:id)
router.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(204).send();
  } catch (err) { res.status(400).json({ error: err.message }); }
});

export default router;