import express from "express";
import AdministrationFee from "../models/AdministrationFee.js";

const router = express.Router();

// ➕ Tambah AdministrationFee (POST /api/adminfees)
router.post("/", async (req, res) => {
  try {
    const adminFee = new AdministrationFee(req.body);
    await adminFee.save();
    res.status(201).json(adminFee);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 📚 Ambil Semua AdministrationFee (GET /api/adminfees)
router.get("/", async (req, res) => {
  try {
    const adminFees = await AdministrationFee.find();
    res.json(adminFees);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 📖 Ambil AdministrationFee Berdasarkan ID (GET /api/adminfees/:id)
router.get("/:id", async (req, res) => {
  try {
    const adminFee = await AdministrationFee.findById(req.params.id);
    if (!adminFee) return res.status(404).json({ error: "AdministrationFee not found" });
    res.json(adminFee);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// ✏️ Update AdministrationFee (PUT /api/adminfees/:id)
router.put("/:id", async (req, res) => {
  try {
    const adminFee = await AdministrationFee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!adminFee) return res.status(404).json({ error: "AdministrationFee not found" });
    res.json(adminFee);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 🗑️ Hapus AdministrationFee (DELETE /api/adminfees/:id)
router.delete("/:id", async (req, res) => {
  try {
    const adminFee = await AdministrationFee.findByIdAndDelete(req.params.id);
    if (!adminFee) return res.status(404).json({ error: "AdministrationFee not found" });
    res.status(204).send();
  } catch (err) { res.status(400).json({ error: err.message }); }
});

export default router;