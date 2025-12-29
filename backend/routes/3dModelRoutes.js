import express from "express";
import ThreeDModel from "../models/3DModel.js";
import fs from "fs";
import path from "path";
import multer from "multer";
import { useEffect, useState, useRef, useContext } from "react";

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

router.post("/save", async (req, res) => {
  try {
    const { path, question, answer } = req.body;

    console.log("Path ", path);
    console.log("question ", question);
    console.log("answer ", answer);

    // Validasi sederhana
    if (!path || !question || !answer) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newDesign = new ThreeDModel({
      Path : path,
      Question : question,
      Answer : answer,
    });

    await newDesign.save();

    // Setelah disimpan, generate link unik dengan ID design
    const shareLink = `${req.protocol}://${req.get("host")}/api/design3d/${newDesign._id}/ar`;

    res.status(201).json({
      message: "Design saved successfully!",
      designId: newDesign._id,
      shareLink,
    });
  } catch (error) {
    console.error("Error saving design:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// === Konfigurasi folder penyimpanan model GLB ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = path.join("public", "models", "exported");
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.id}.gltf`);
  },
});

const upload = multer({ storage });

/**
 * @route   POST /api/design3d/:id/export
 * @desc    Simpan model GLB hasil customizer ke server
 * @access  Public
 */
router.post("/:id/export", upload.single("model"), async (req, res) => {
  try {
    const modelUrl = `/models/exported/${req.params.id}.gltf`;

    await ThreeDModel.findByIdAndUpdate(req.params.id, { modelUrl });
    res.json({ success: true, modelUrl });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menyimpan model GLB" });
  }
});

router.put("/:id/add-path", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { ModelId, Path } = req.body;

    console.log("Model ID:", ModelId);
    console.log("Path :", Path);

    const updatedModel = await ThreeDModel.findByIdAndUpdate(
      ModelId,
      { 
        Path : Path 
      },
      { new: true } // Mengembalikan data user yang sudah terupdate
    );

    res.status(200).json(updatedModel);
  } catch (error) {
    res.status(500).json({ message: "Gagal update user", error });
  }
});

export default router;