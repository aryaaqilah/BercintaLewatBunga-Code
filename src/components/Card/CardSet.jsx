import React, { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook navigasi
import Card from './Card';
import './Card.css';
import { AuthContext } from "../../AuthContext";

const CardSet = ({ cards }) => {
  const { user } = useContext(AuthContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate(); // Inisialisasi fungsi navigasi

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const handleCardSelect = (card) => {
     // Berpindah ke halaman /order
    // Opsi: Kirim data produk yang dipilih melalui state agar bisa dibaca di halaman Order
    if (user) {
      console.log("Selected card:", card);
      navigate('/confirmation', { 
      state: { selectedProduct: card } 
    });
    }
    else{
      alert("Silakan login terlebih dahulu untuk melakukan pembelian.");
      navigate('/login');
    }
  }

  // Proteksi jika data cards belum termuat
  if (!cards || cards.length === 0) return null;

  return (
    <div className="card-set">
      {cards.map((card, index) => (
        <Card
          key={card.id || index}
          isActive={index === activeIndex}
          // Kirim index dan data card ke fungsi handler
          onClick={() => handleCardClick(index)}
          cardModel={card}
          onSelect={() => handleCardSelect(card)}
        />
      ))}
    </div>
  );
};

export default CardSet;