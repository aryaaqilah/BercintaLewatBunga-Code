import './Confirmation.css'
import React, { useState , useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from "../../AuthContext";
import { get as getDb } from 'idb-keyval';
import { del as delDb } from 'idb-keyval';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function MainSection({selectedProduct, modelScene, meta}) {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); // Inisialisasi fungsi navigasi
     const [data, setData] = useState();
     let tempData = {};
    const handleCardSelect = (selectedProduct) => {
  const summaryText = meta?.summary
    .filter(item => item.qty > 0)
    .map(item => `${item.name} x${item.qty}`)
    .join(", ") || "";

  let finalDataToSend;

  if (selectedProduct) {
    finalDataToSend = selectedProduct;
  } else {
    finalDataToSend = {
      id: "",
      isCustomizable: true,
      title: "Customized Bouquet",
      description: summaryText,
      price: meta?.totalPrice,
      image: "",
      // modelScene: modelScene, // ❌ HAPUS BARIS INI (Penyebab Error)
      quantity: 1
    };
  }

  if (user) {
    navigate('/address', { 
      state: { selectedProduct: finalDataToSend } 
    });
  } else {
    alert("Silakan login terlebih dahulu.");
    navigate('/login');
  }
};
  console.log("Selected Product:", selectedProduct);
  return (
    <div>
      <section className='MainSection'>
        <div className="box"></div>
        <div className="SectionContainer">
          <div className="MainBox">
            <div className="ModelBox">
              <div style={{ height: '100%', width: '100%', borderRadius: '15px' }}>
        {!selectedProduct ? (
      /* Kondisi A: Menampilkan Canvas */
      <Canvas>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} />
        {modelScene && <primitive object={modelScene} scale={0.8} />}
        <OrbitControls />
      </Canvas>
    ) : (
      /* Kondisi B: Menampilkan Gambar */
      <img 
        src={`}`}
        alt="Model Preview" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    )}
      </div>
            </div>
            <div className="InfoBox">
              <div className="FillerBox"></div>
              <div className="InsideBox">
                <div className="NameBox">
                  <h1>{selectedProduct?.title || "Customized Bouquet"}</h1>
                </div>
                <div className="DetailBox">
                  <p>{selectedProduct?.description || meta?.summary.map((item, index) => (
        /* Hanya tampilkan jika qty lebih besar dari 0 */
        item.qty > 0 && (
          <div key={index} className="summary-item">
            <p style={{ fontSize: '15px', fontWeight: '500' }}>
              {item.name} x{item.qty}
            </p>
          </div>
        )
      ))}<br /></p>
                </div>
                <div className="SummaryBox">
                  <div className="QuantityBox">
                    <h2>x 1</h2>
                  </div>
                  <div className="PriceBox">
                    <h2>{selectedProduct?.price || meta?.totalPrice.toLocaleString('id-ID')}</h2>
                  </div>
                </div>
                <div className="NotesBox">
                  Notes :
                  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem, magni?</p>
                </div>
                <div className="btnContainer" style={{display: 'flex', justifyContent: 'center'}}>
                  <button className="btnConfirm" onClick={() => handleCardSelect(selectedProduct)}>Konfirmasi</button>
                </div>
              </div>
              <div className="FillerBox"></div>
            </div>
          </div>
        </div>
        <div className="box"></div>
      </section>
    </div>
  )
}

export default function Confirmation() {

  const selectedProduct = window.history.state && window.history.state.usr && window.history.state.usr.selectedProduct;
  console.log("Selected Product in Confirmation Page:", selectedProduct);

  const [modelScene, setModelScene] = useState(null);
  const [meta, setMeta] = useState(null);



  useEffect(() => {
  const syncProvinces = async () => {
  try {
    const response = await fetch("https://api-regional-indonesia.vercel.app/api/provinces");
        const result = await response.json();
        const provinces = result.data;

    const provincesPayload = provinces.map(prov => ({
            _id: prov.id, // Menggunakan ID asli sebagai _id di MongoDB
            name: prov.name
        }));

        console.log("Provinces Payload:", provincesPayload);

        const testProv = provincesPayload[0];

        // 3. POST ke API lokal Anda
        const res = await fetch("http://localhost:5000/api/provinces", { // Sesuaikan endpoint Anda
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testProv), 
        });

        const savedData = await res.json();

        if (!res.ok) {
            throw new Error(savedData.message || "Gagal menyimpan data provinsi");
        }

        console.log("Berhasil menyimpan semua provinsi:", savedData);
        alert("Data berhasil disinkronisasi!");
  } catch (error) {
    console.error("Gagal simpan data:", error);
  }
}

    syncProvinces();
  const loadFromDB = async () => {
    // 1. Ambil Metadata
    const savedMeta = await getDb('pending_order_meta');
    setMeta(savedMeta);

    // 2. Ambil Data Model
    const data = await getDb('pending_order_model');
    
    if (data) {
      const loader = new GLTFLoader();
      
      // JIKA DATA ADALAH ARRAYBUFFER (Hasil binary: true)
      // Gunakan method .parse() bukan .load()
      loader.parse(
        data, 
        '', // path dasar kosong
        (gltf) => {
          // Atur posisi/skala agar terlihat di preview tengah
          gltf.scene.position.set(0, -1, 0); 
          setModelScene(gltf.scene);
        },
        (error) => {
          console.error("❌ Error parsing GLTF:", error);
        }
      );
    }
  };

  loadFromDB();
}, []);
const navigate = useNavigate();
useEffect(() => {
  const loadAndDestroy = async () => {
    const data = await getDb('pending_order_model');
    const meta = await getDb('pending_order_meta');

    if (!data && !selectedProduct) {
      // Jika tidak ada data, arahkan kembali ke customizer
      alert("Keranjang kosong, silakan buat desain terlebih dahulu.");
      navigate('/temp');
      return;
    }

    // 1. Simpan ke State untuk ditampilkan
    const loader = new GLTFLoader();
    loader.parse(data, '', (gltf) => {
      setModelScene(gltf.scene);
    });
    setMeta(meta);

    // 2. LANGSUNG HAPUS dari IndexedDB
    // Sekarang data hanya hidup di memori RAM (React State)
    // await delDb('pending_order_model');
    // await delDb('pending_order_meta');
    console.log("🗑️ Data IndexedDB dihapus demi keamanan.");
  };

  loadAndDestroy();
}, []);

const handleBackToEditor = () => {
  // Navigasi balik saja, data di IndexedDB tidak dihapus 
  // agar MainSection bisa memuatnya kembali.
  navigate('/temp'); 
};

console.log("Meta Data:", meta);

  return (
    
    <div>
      
      <MainSection selectedProduct={selectedProduct} modelScene={modelScene} meta={meta} />
    </div>
  );
}