import express from "express";
import District from "../models/District.js";

const router = express.Router();

// ➕ Tambah District (POST /api/districts)
router.post("/", async (req, res) => {
  try {
    const district = new District(req.body);
    await district.save();
    res.status(201).json(district);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 📚 Ambil Semua District (GET /api/districts)
router.get("/", async (req, res) => {
  try {
    const districts = await District.find().populate('CityId');
    res.json(districts);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 📚 Ambil kecamatan by kecamatan_id (GET /api/districts)
router.get("/get-by-id/", async (req, res) => {
  try {
        const { kecamatan_id } = req.query;
        
        let filter = {};
        if (kecamatan_id) {
            // Penting: Gunakan Number() karena data di gambar Anda adalah tipe angka
            filter = { kecamatan_id: Number(kecamatan_id) };
        }

        // Mencari ke database menggunakan model yang sudah ada di backend
        const data = await District.find(filter); 
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 📖 Ambil District Berdasarkan ID (GET /api/districts/:id)
router.get("/:id", async (req, res) => {
  try {
    const district = await District.findById(req.params.id).populate('CityId');
    if (!district) return res.status(404).json({ error: "District not found" });
    res.json(district);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// ✏️ Update District (PUT /api/districts/:id)
router.put("/:id", async (req, res) => {
  try {
    const district = await District.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('CityId');
    if (!district) return res.status(404).json({ error: "District not found" });
    res.json(district);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 🗑️ Hapus District (DELETE /api/districts/:id)
router.delete("/:id", async (req, res) => {
  try {
    const district = await District.findByIdAndDelete(req.params.id);
    if (!district) return res.status(404).json({ error: "District not found" });
    res.status(204).send();
  } catch (err) { res.status(400).json({ error: err.message }); }
});

export default router;