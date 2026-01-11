import express from "express";
import ThreeDModel from "../models/3DModel.js";
import Product from "../models/Product.js";
import fs from "fs";
import path from "path";
import multer from "multer";
import { useEffect, useState, useRef, useContext } from "react";
import mongoose from 'mongoose';

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

router.get("/:id/ar", async (req, res) => {
  // const mongoose = require("mongoose");
  try {
    const design = await ThreeDModel.findById(req.params.id);
    if (!design) return res.status(404).send("<h2>❌ Desain tidak ditemukan</h2>");
    console.log("Design fetched:", design);

    const ThreeDModelId = req.params.id;
            
    let filter = {};
    if (ThreeDModelId) {
        // Penting: Gunakan Number() karena data di gambar Anda adalah tipe angka
        filter = { ThreeDModel: ThreeDModelId };
    }

    // Mencari ke database menggunakan model yang sudah ada di backend
    const product = await Product.findOne(filter);

    console.log("Associated product:", product);

    console.log("req.params.id :", ThreeDModelId);

    // Jika belum ada jawaban yang dikirim, tampilkan form pertanyaan
    if (!req.query.answer) {
      return res.send(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verifikasi Desain - ${product.Name}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              background: #f0f0f0;
            }
            form {
              background: white;
              padding: 20px 30px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            input[type=text] {
              padding: 8px;
              width: 100%;
              margin-top: 10px;
              margin-bottom: 15px;
            }
            button {
              padding: 8px 15px;
              background: #007BFF;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <h2>${product.Name}</h2>
          <p><strong>Pertanyaan:</strong> ${design.Question || "Tidak ada pertanyaan"}</p>
          <form method="GET" action="/api/design3d/${design._id}/ar">
            <input type="text" name="answer" placeholder="Jawaban Anda" required />
            <button type="submit">Kirim</button>
          </form>
        </body>
        </html>
      `);
    }

    // Jika sudah ada jawaban, cek validitasnya
    if (req.query.answer.trim().toLowerCase() !== design.Answer.trim().toLowerCase()) {
      return res.send(`
        <h2>❌ Jawaban salah</h2>
        <a href="/api/design3d/${design._id}/ar">Coba lagi</a>
      `);
    }

    // Jika jawaban benar → tampilkan AR model
const arPage = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${product.Name} - AR View</title>
        <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
        <style>
          body {
            margin: 0;
            height: 100vh;
            width: 100vw;
            display: flex;
            flex-direction: column; /* Menyusun elemen (Info lalu Model) ke bawah */
            justify-content: center;
            align-items: center;
            background: #f7f7f7;
            gap: 20px; /* Jarak antara teks info dan model */
          }

          /* Info ditaruh di luar model agar rapi */
          .info {
            text-align: center;
            background: transparent;
            font-family: sans-serif;
            color: #333;
          }

          /* Model viewer mengambil 80% layar */
          model-viewer {
            width: 80vw;
            height: 80vh;
            background-color: #ffffff; /* Putih agar kontras dengan background body */
            border-radius: 20px;       /* Sudut melengkung agar cantik */
            box-shadow: 0 10px 30px rgba(0,0,0,0.1); /* Bayangan halus */
            overflow: hidden;
          }
        </style>
      </head>
      <body>
        
        <div class="info">
          <strong>${product.Name}</strong><br/>
          <small>AR Mode: Ketuk ikon AR di bawah kanan 👇</small>
        </div>

        <model-viewer
          src="/models/exported/${design._id}.gltf"
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          exposure="1"
        ></model-viewer>
        
      </body>
      </html>
    `;

    res.send(arPage);
  } catch (err) {
    console.error(err);
    res.status(500).send("<h2>⚠️ Terjadi kesalahan server</h2>");
  }
});

export default router;