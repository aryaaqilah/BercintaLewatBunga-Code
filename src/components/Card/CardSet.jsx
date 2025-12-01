import React, { useState } from 'react';
import { CardModel } from '../../models/CardModel';
import Card from './Card';
import bouquetImage from '../../assets/Logo/Logo_Primary_Light.png';
import logo from '../../assets/Logo/Logo_Primary_Dark.png';
import './Card.css';

const CardSet = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const cardData = [
    new CardModel(
      'Kreasikan buketmu',
      'IDR 300',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      logo,
      bouquetImage
    ),
    new CardModel(
      'Buket Mawar Merah',
      'IDR 350',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      logo,
      bouquetImage
    ),
    new CardModel(
      'Buket Bunga Matahari',
      'IDR 400',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      logo,
      bouquetImage
    ),
    new CardModel(
      'Buket Tulip Putih',
      'IDR 450',
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      logo,
      bouquetImage
    ),
  ];

  return (
    <div className="card-set">
      {cardData.map((card, index) => (
        <Card
          key={index}
          isActive={index === activeIndex}
          onClick={() => handleCardClick(index)}
          cardModel={card}
        />
      ))}
    </div>
  );
};

export default CardSet;