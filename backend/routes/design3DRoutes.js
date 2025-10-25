import express from "express";
import Design3D from "../models/Design3D.js";

const router = express.Router();

/**
 * @route   POST /api/design3d
 * @desc    Simpan desain 3D baru
 */
router.post("/", async (req, res) => {
  try {
    let { name, user, flowers, wrapper, card } = req.body;

    // Parse jika dikirim dalam bentuk string JSON
    if (typeof flowers === "string") {
      flowers = JSON.parse(flowers);
    }

    // Otomatis generate modelPath untuk setiap bunga
    const processedFlowers = (flowers || []).map((f) => ({
      ...f,
      modelPath: `/models/${f.type}.glb`,
    }));

    const design = new Design3D({
      name,
      user,
      flowers: processedFlowers,
      wrapper,
      card,
    });

    await design.save();
    res.status(201).json({
      message: "Desain berhasil disimpan",
      design,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @route   GET /api/design3d
 * @desc    Ambil semua desain
 */
router.get("/", async (req, res) => {
  try {
    const designs = await Design3D.find().populate("user", "name email");
    res.json(designs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   GET /api/design3d/:id
 * @desc    Ambil satu desain berdasarkan ID
 */
router.get("/:id", async (req, res) => {
  try {
    const design = await Design3D.findById(req.params.id).populate("user", "name email");
    if (!design) return res.status(404).json({ message: "Desain tidak ditemukan" });
    res.json(design);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @route   PUT /api/design3d/:id
 * @desc    Update desain
 */
router.put("/:id", async (req, res) => {
  try {
    let { name, flowers, wrapper, card } = req.body;

    if (typeof flowers === "string") {
      flowers = JSON.parse(flowers);
    }

    const processedFlowers = (flowers || []).map((f) => ({
      ...f,
      modelPath: `/models/${f.type}.glb`,
    }));

    const updatedDesign = await Design3D.findByIdAndUpdate(
      req.params.id,
      {
        name,
        flowers: processedFlowers,
        wrapper,
        card,
      },
      { new: true, runValidators: true }
    );

    if (!updatedDesign)
      return res.status(404).json({ message: "Desain tidak ditemukan" });

    res.json({
      message: "Desain berhasil diperbarui",
      updatedDesign,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @route   DELETE /api/design3d/:id
 * @desc    Hapus desain
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Design3D.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Desain tidak ditemukan" });

    res.json({ message: "Desain berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
