import React from 'react';
import './StoreCard.css';

const StoreCard = ({ store, onSelect }) => {
  return (
    <div className="StoreCardBox">
      <div className="StoreLogoWrapper">
        <img 
          src={store.logo || "https://via.placeholder.com/150"} 
          alt={store.name} 
          className="StoreLogoImage" 
        />
      </div>
      <button 
        className="StoreActionButton" 
        onClick={() => onSelect(store)}
      >
        Lihat Toko
      </button>
    </div>
  );
};

export default StoreCard;