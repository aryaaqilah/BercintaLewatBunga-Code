import express from "express";
import User from "../models/User.js";
import Address from "../models/Address.js"
import Province from "../models/Province.js"
import City from "../models/City.js"
import District from "../models/District.js"
import PostalCode from "../models/PostalCode.js"
import Delivery from "../models/Delivery.js"
import Product from "../models//Product.js"
import ThreeDModel from "../models/3DModel.js"
import AdministrationFee from "../models/AdministrationFee.js";
import Discount from "../models/Discount.js";

const router = express.Router();

// 🚀 Tambah User Baru (POST /api/users)
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    console.log("Membuat user baru:", user);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔍 Ambil Semua User (GET /api/users)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate('Orders');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ "Email": email, "Password": password });
    
    if (!user) {
      return res.status(404).json({ error: "Input Tidak Valid" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔎 Ambil User Berdasarkan ID (GET /api/users/:id)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('Orders');
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✍️ Update User Berdasarkan ID (PUT /api/users/:id)
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id/add-order", async (req, res) => {
  try {
    const userId = req.params.id;
    const { OrderId } = req.body;

    console.log("User ID:", userId);
    console.log("Order ID:", OrderId);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { 
        // DI SINI LETAK $PUSH
        $push: { Orders: OrderId } 
      },
      { new: true } // Mengembalikan data user yang sudah terupdate
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Gagal update user", error });
  }
});

// 🗑️ Hapus User Berdasarkan ID (DELETE /api/users/:id)
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/orders/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: 'Orders',
      populate: [
        { 
          path: "Address", 
          model: Address,
          populate: [
            { 
              path: "Province",
              model: Province
            },
            { 
              path: "City",
              model: City
            },
            { 
              path: "District",
              model: City
            },
            { 
              path: "PostalCode",
              model: PostalCode
            }
          ]
        },
        {
          path: "Delivery",
          model: Delivery
        },
        {
          path: "Product",
          model: Product,
          populate: [
            {
              path: "3DModel",
              model: ThreeDModel
            }
          ]
        },
        {
          path: "AdministrationFee",
          model: AdministrationFee
        },
        {
          path: "Discount",
          model: Discount
        }
      ]
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);

  } catch (err) {
    console.error("Population Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✍️ UPDATE User by ID (For the Save Button)
router.put("/:id", async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    
    // Create update object
    const updateData = { Name, Email };
    if (Password) updateData.Password = Password;

    const user = await User.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });
    
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;