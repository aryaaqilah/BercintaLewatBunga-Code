import express from "express";
import PostalCode from "../models/PostalCode.js";

const router = express.Router();

// ➕ Tambah PostalCode (POST /api/postalcodes)
router.post("/", async (req, res) => {
  try {
    const postalCode = new PostalCode(req.body);
    await postalCode.save();
    res.status(201).json(postalCode);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 📚 Ambil Semua PostalCode (GET /api/postalcodes)
router.get("/", async (req, res) => {
  try {
    const postalCodes = await PostalCode.find().populate('DistrictId');
    res.json(postalCodes);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 📖 Ambil PostalCode Berdasarkan ID (GET /api/postalcodes/:id)
router.get("/:id", async (req, res) => {
  try {
    const postalCode = await PostalCode.findById(req.params.id).populate('DistrictId');
    if (!postalCode) return res.status(404).json({ error: "PostalCode not found" });
    res.json(postalCode);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// ✏️ Update PostalCode (PUT /api/postalcodes/:id)
router.put("/:id", async (req, res) => {
  try {
    const postalCode = await PostalCode.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('DistrictId');
    if (!postalCode) return res.status(404).json({ error: "PostalCode not found" });
    res.json(postalCode);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 🗑️ Hapus PostalCode (DELETE /api/postalcodes/:id)
router.delete("/:id", async (req, res) => {
  try {
    const postalCode = await PostalCode.findByIdAndDelete(req.params.id);
    if (!postalCode) return res.status(404).json({ error: "PostalCode not found" });
    res.status(204).send();
  } catch (err) { res.status(400).json({ error: err.message }); }
});

export default router;