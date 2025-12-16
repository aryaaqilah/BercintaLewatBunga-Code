import './Temp.css'
import LilyImage from '../../assets/png/lilly.png';
import TulipImage from '../../assets/png/tulip.png';
import RoseImage from '../../assets/png/rose.png';
import WrapperImage from '../../assets/png/wrapper.png';
import React, { useState } from 'react';

const GalleryCard = ({ name, imageSrc, onAddObject }) => {
  // Menentukan warna background yang sedikit berbeda untuk Wrapper (abu-abu/grayscale)
  const isWrapper = name.toLowerCase() === 'wrapper';
  const topBgColor = isWrapper ? '#c0c0c0' : '#e3e3e3';
  const bottomBgColor = isWrapper ? '#808080' : '#b0afa9';

  const handleAdd = () => {
    onAddObject(name);
  };

  return (
    <div 
      className="gallery-card-btn" 
      onClick={handleAdd}
      role="button"
      tabIndex={0}
      style={{ boxShadow: isWrapper ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.1)' }} // Shadow sedikit lebih gelap untuk Wrapper
    >
      {/* Layer Background */}
      <div className="card-bg">
        <div className="bg-top" style={{ backgroundColor: topBgColor }}></div>
        <div className="bg-bottom" style={{ backgroundColor: bottomBgColor }}>
          <span className="label-text">{`+ ${name.toLowerCase()}`}</span>
        </div>
      </div>

      {/* Layer Gambar 3D */}
      <img 
        src={imageSrc} 
        alt={`Add ${name}`} 
        className="card-img"
        style={{ width: name.toLowerCase() === 'wrapper' ? '110%' : '85%' }} // Wrapper sedikit lebih besar
      />
    </div>
  );
};

// --- 3. Komponen Utama Galeri ---
const FlowerGallery = () => {
  
  // Fungsi yang dijalankan saat tombol diklik
  const handleAddObject = (objectName) => {
    console.log(`Menambahkan objek ${objectName} ke scene...`);
    alert(`Objek '${objectName}' Berhasil Ditambahkan!`);
  };

  // Data objek yang akan ditampilkan
  const objects = [
    { name: 'Lily', image: LilyImage },
    { name: 'Tulip', image: TulipImage },
    { name: 'Rose', image: RoseImage },
    { name: 'Wrapper', image: WrapperImage },
  ];

  return (
    <div className="gallery-container">
      {objects.map((obj) => (
        <GalleryCard
          key={obj.name}
          name={obj.name}
          imageSrc={obj.image}
          onAddObject={handleAddObject}
        />
      ))}

      {/* Style CSS Internal */}
      <style>{`
        .gallery-container {
          display: flex;
          gap: 20px; /* Jarak antar kartu */
          padding-top: 10px;
          border-radius: 10px;
        }
        
        /* Gaya Tombol Dasar */
        .gallery-card-btn {
          position: relative;
          width: 140px;
          height: 160px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .gallery-card-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0,0,0,0.25);
        }

        .gallery-card-btn:active {
          transform: scale(0.98);
        }

        .card-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          z-index: 1;
        }

        .bg-top {
          flex: 65;
        }

        .bg-bottom {
          flex: 35;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: 10px;
        }

        .label-text {
          font-family: 'Times New Roman', serif;
          color: white;
          font-size: 18px;
          letter-spacing: 1px;
          z-index: 3;
        }

        /* Gambar objek */
        .card-img {
          position: absolute;
          top: 45%; 
          left: 50%;
          transform: translate(-50%, -50%);
          height: auto;
          z-index: 2;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

const WRAPPER_COLORS = [
  { id: 1, hex: '#b09386', label: 'Beige', isSelected: true },
  { id: 2, hex: '#f1f0c2', label: 'Cream' },
  { id: 3, hex: '#81c7c7', label: 'Aqua' },
  { id: 4, hex: '#7b68ee', label: 'Purple' },
  { id: 5, hex: '#8b56f8', label: 'Violet' },
];

const ColorSelector = ({ title = "warna wrapper", colors = WRAPPER_COLORS }) => {
  // State untuk melacak warna mana yang saat ini dipilih
  const [selectedColorId, setSelectedColorId] = useState(colors[0].id);

  const handleColorClick = (id) => {
    setSelectedColorId(id);
    console.log(`Warna ${title} diubah ke ID: ${id}`);
    // Di sini Anda bisa memanggil fungsi props untuk mengubah state aplikasi utama
  };

  return (
    <>
      <div className="color-selector-group">
        {/* Label Judul */}
        <h3 className="selector-title">{title}</h3>

        {/* Bar Pemilihan Warna */}
        <div className="color-bar-container">
          {colors.map((color) => {
            const isSelected = color.id === selectedColorId;
            return (
              <div
                key={color.id}
                className="color-swatch-wrapper"
                onClick={() => handleColorClick(color.id)}
              >
                {/* Lingkaran Warna */}
                <div
                  className={`color-swatch ${isSelected ? 'selected' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.label}
                  role="button"
                  tabIndex={0}
                ></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Style CSS Internal */}
      <style>{`
        .color-selector-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .selector-title {
          font-family: 'Times New Roman', serif;
          font-size: 18px;
          font-weight: normal;
          margin: 0 0 8px 0; /* Jarak antara judul dan bar warna */
          color: #333;
        }

        .color-bar-container {
          display: flex;
          align-items: center;
          background-color: #808080; /* Warna abu-abu latar belakang bar */
          border-radius: 20px;
          padding: 8px 10px;
          gap: 10px; /* Jarak antar lingkaran warna */
        }

        .color-swatch-wrapper {
          cursor: pointer;
          transition: transform 0.15s ease;
        }

        .color-swatch-wrapper:hover {
          transform: scale(1.1); /* Efek saat di-hover */
        }

        .color-swatch {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 3px solid transparent; /* Border default transparan */
          box-sizing: border-box;
          transition: border-color 0.15s ease;
        }

        /* Gaya untuk warna yang dipilih */
        .color-swatch.selected {
          border-color: #d19077; /* Warna oranye/cokelat untuk border terpilih */
          box-shadow: 0 0 0 1px #d19077; /* Bayangan tipis untuk mempertegas */
        }
      `}</style>
    </>
  );
};

// --- Contoh Penggunaan di Halaman Utama ---
const ColorChoose = () => {
  // Untuk tujuan contoh, kita bisa mendefinisikan warna Ribbon juga
  const RIBBON_COLORS = [
    { id: 10, hex: '#b09386', label: 'Beige' },
    { id: 11, hex: '#f1f0c2', label: 'Cream' },
    { id: 12, hex: '#81c7c7', label: 'Aqua' },
    { id: 13, hex: '#7b68ee', label: 'Purple', isSelected: true }, // Contoh default terpilih lain
    { id: 14, hex: '#8b56f8', label: 'Violet' },
  ];

  return (
    <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
      {/* 1. Selector untuk Wrapper */}
      <ColorSelector 
        title="warna wrapper" 
        colors={WRAPPER_COLORS}
      />
      
      {/* 2. Selector untuk Ribbon (Opsional, mencontoh desain kedua) */}
      <ColorSelector 
        title="warna ribbon" 
        colors={RIBBON_COLORS} 
      />
    </div>
  );
};

function MainSection() {
  return (
    <div>
      <section className='Temp-MainSection'>
        <div className="box"></div>
        <div className="Temp-SectionContainer">
          <div className="Temp-MainBox">
            <div className="Temp-ModelBox"></div>
            <div className="Temp-InfoBox">
            <div className="" style={{ display : "flex", alignSelf : "flex-start", paddingLeft : "5%", fontSize : "32px", paddingBottom : "10px"}}>
                Sampaikan Bunga Mu
            </div>
              <div className="CustomizerMessage">
                <div class="input-group">
                  <label for="pesan" class="input-label label-pesan">pesan untuknya</label>
                  <input type="text" id="pesan" class="input-field-customizer input-pesan" name="pesan"></input>
                </div>                        
              </div>
              <div className="CustomizerAddModel">
                <FlowerGallery />
              </div>
              <div className="CustomizerColor">
                <ColorChoose /> 
              </div>
              <div className="CustomizerQuestion" style={{paddingTop : '10px'}}>
                <div class="input-group">
                  <label for="question" class="input-label">pertanyaan konfirmasi</label>
                  <input type="text" id="question" class="input-field-customizer" name="question"></input>
                </div> 
              </div>
              <div className="CustomizerAnswer">
                <div class="input-group">
                  <label for="answer" class="input-label">jawaban</label>
                  <input type="text" id="answer" class="input-field-customizer" name="answer"></input>
                </div> 
              </div>
            </div>
          </div>
        </div>
        <div className="box"></div>
      </section>
      <div style={{ display:'flex' }}>
      <div className="box"></div>
        <div className="btnContainer" style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <button className="btnAddress" >Selesai</button>
        </div>
      <div className="box"></div>
      </div>
    </div>
  )
}

export default function Temp() {
  return (
    <div>
      <MainSection />
    </div>
  );
}