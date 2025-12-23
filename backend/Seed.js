import mongoose from 'mongoose';
import User from './models/User.js';
import Address from './models/Address.js';
import Order from './models/Order.js';
import Product from './models/Product.js';
import Item from './models/Item.js';
import Component from './models/Component.js';
import Delivery from './models/Delivery.js';
import Discount from './models/Discount.js';
import Province from './models/Province.js';
import City from './models/City.js';
import District from './models/District.js';
import PostalCode from './models/PostalCode.js';
import ThreeDModel from './models/3DModel.js';
import AdministrationFee from './models/AdministrationFee.js';

// Ganti dengan URI database MongoDB Anda
const MONGODB_URI = 'mongodb+srv://bercintalewatbunga_db_user:7F29fbo7G1zgkQnf@bercintalewatbunga.wzelzbn.mongodb.net/?appName=bercintalewatbunga'; 

const seedDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB for database seeding.');

        // 1. --- Hapus semua koleksi lama ---
        console.log('\n--- Menghapus data lama ---');
        await Promise.all([
            User.deleteMany({}),
            Order.deleteMany({}),
            Product.deleteMany({}),
            Item.deleteMany({}),
            Component.deleteMany({}),
            Address.deleteMany({}),
            Delivery.deleteMany({}),
            Discount.deleteMany({}),
            Province.deleteMany({}),
            City.deleteMany({}),
            District.deleteMany({}),
            PostalCode.deleteMany({}),
            ThreeDModel.deleteMany({}),
            AdministrationFee.deleteMany({}),
        ]);
        console.log('🗑️ Semua koleksi lama berhasil dikosongkan.');

        // 2. --- Buat Data Dasar (Model tanpa Foreign Key) ---
        console.log('\n--- Memasukkan Data Dasar (Level 0) ---');
        
        const adminFee = await AdministrationFee.create({ Fee: 7500 });
        console.log(`- AdministrationFee: ID ${adminFee._id}`);
        
        const discountPromo = await Discount.create({ Name: 'DISKON10', Percentage: 0.10, Maximum: 50000 });
        console.log(`- Discount: ID ${discountPromo._id}`);

        const deliveryService = await Delivery.create({ 
            ShippingCode: 'DEL001XYZ', 
            Service: 'Express', 
            EstimatedArrival: new Date('2025-12-20'),
            TrackingLink: 'http://track.delivery.com/001'
        });
        console.log(`- Delivery: ID ${deliveryService._id}`);

        const componentA = await Component.create({ Name: 'Chipset XYZ', Price: 150000, Asset: '/assets/chip.url' });
        const componentB = await Component.create({ Name: 'Casing Premium', Price: 300000, Asset: '/assets/case.url' });
        console.log(`- Component (2): ID ${componentA._id}, ${componentB._id}`);
        
        const model3D = await ThreeDModel.create({ 
            Path: '/models/robot.obj', 
            Question: 'Apakah ini tahan air?', 
            Answer: 'Ya, rating IP67.' 
        });
        console.log(`- 3DModel: ID ${model3D._id}`);

        const province1 = await Province.create({ Name: 'DKI Jakarta' });
        console.log(`- Province: ID ${province1._id}`);

        // 3. --- Buat Data Level 1 (Menggunakan FK dari Level 0) ---
        console.log('\n--- Memasukkan Data Level 1 ---');

        const city1 = await City.create({ Name: 'Jakarta Selatan', Province: province1._id });
        console.log(`- City: ID ${city1._id}`);

        const district1 = await District.create({ Name: 'Kebayoran Baru', City: city1._id });
        console.log(`- District: ID ${district1._id}`);
        
        const postalCode1 = await PostalCode.create({ Name: '12120', District: district1._id });
        console.log(`- PostalCode: ID ${postalCode1._id}`);

        const item1 = await Item.create({ ComponentId: componentA._id, Quantity: 2 });
        const item2 = await Item.create({ ComponentId: componentB._id, Quantity: 1 });
        console.log(`- Item (2): ID ${item1._id}, ${item2._id}`);
        
        const address1 = await Address.create({
            RecipientNumber: '0812111222',
            RecipientName: 'Budi Santoso',
            Province: province1._id,
            City: city1._id,
            District: district1._id,
            PostalCode: postalCode1._id,
            Detail: 'Jalan Senopati No. 5'
        });
        console.log(`- Address: ID ${address1._id}`);

        // 4. --- Buat Data Level 2 (Produk, User) ---
        console.log('\n--- Memasukkan Data Level 2 ---');
        
        const productA = await Product.create({
            Name: 'Robot Kit Basic',
            Price: 500000,
            Quantity: 10,
            Image: '/img/robot.png',
            '3DModel': model3D._id,
            Items: [item1._id, item2._id] // Array of Item IDs
        });
        console.log(`- Product: ID ${productA._id}`);
        
        const user1 = await User.create({
            Name: 'Ahmad Zaki',
            Email: 'ahmad@example.com',
            Password: 'hashedpassword' // Dalam produksi, harusnya hash
        });
        console.log(`- User: ID ${user1._id}`);

        // 5. --- Buat Data Level 3 (Order) ---
        console.log('\n--- Memasukkan Data Level 3 ---');

        const order1 = await Order.create({
            Status: 2,
            Address: address1._id,
            Delivery: deliveryService._id,
            Product: productA._id,
            ProductPrice: productA.Price * 1.0, // Quantity 1
            AdministrationFee: adminFee._id,
            Discount: discountPromo._id,
            Total: (productA.Price + adminFee.Fee) * (1 - discountPromo.Percentage) 
            // Total: 507500 * 0.9 = 456750
        });
        console.log(`- Order: ID ${order1._id}`);
        
        // Update User dengan Order ID
        user1.Orders.push(order1._id);
        await user1.save();
        console.log(`- Order ditambahkan ke User ${user1._id}`);
        
        console.log('\n✨ Database Seeding Berhasil Selesai!');
        

    } catch (error) {
        console.error('❌ Error saat seeding data:', error.message);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log('Koneksi MongoDB ditutup.');
    }
};

// Eksekusi skrip
seedDatabase();