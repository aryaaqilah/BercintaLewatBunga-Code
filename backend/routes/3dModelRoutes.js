import express from "express";
import ThreeDModel from "../models/3DModel.js";

const router = express.Router();

// ➕ Tambah 3DModel (POST /api/3dmodels)
router.post("/", async (req, res) => {
  try {
    const model = new ThreeDModel(req.body);
    await model.save();
    res.status(201).json(model);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 📚 Ambil Semua 3DModel (GET /api/3dmodels)
router.get("/", async (req, res) => {
  try {
    const models = await ThreeDModel.find();
    res.json(models);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// 📖 Ambil 3DModel Berdasarkan ID (GET /api/3dmodels/:id)
router.get("/:id", async (req, res) => {
  try {
    const model = await ThreeDModel.findById(req.params.id);
    if (!model) return res.status(404).json({ error: "3DModel not found" });
    res.json(model);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// ✏️ Update 3DModel (PUT /api/3dmodels/:id)
router.put("/:id", async (req, res) => {
  try {
    const model = await ThreeDModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!model) return res.status(404).json({ error: "3DModel not found" });
    res.json(model);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// 🗑️ Hapus 3DModel (DELETE /api/3dmodels/:id)
router.delete("/:id", async (req, res) => {
  try {
    const model = await ThreeDModel.findByIdAndDelete(req.params.id);
    if (!model) return res.status(404).json({ error: "3DModel not found" });
    res.status(204).send();
  } catch (err) { res.status(400).json({ error: err.message }); }
});

export default router;