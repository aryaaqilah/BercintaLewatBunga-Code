// src/components/Card.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { CardModel } from '../../models/CardModel';
import './Card.css';


const Card = ({ isActive, onClick, cardModel, onSelect }) => (
  // const navigate = useNavigate();
  <div className={`card ${isActive ? 'active' : 'inactive'}`} onClick={onClick}>
    {isActive ? (
      <>
        <img src={`http://localhost:5000${cardModel.image}`} alt={cardModel.title} className="bouquet-image" />
        <div className="card-content">
          <div className="title-price">
            <h2 className='txt-color-primary'>{cardModel.title}</h2>
            <p className="txt-color-ternary">{cardModel.price}</p>
          </div>
          <p className="txt-color-ternary">{cardModel.description}</p>
          <button className="button-primary-fill p1" onClick={onSelect}>Beli</button>
        </div>
      </>
    ) : (
      <div className="logo-container">
        <img src={`http://localhost:5000${cardModel.image}`} alt="Logo" className="logo-image" />
      </div>
    )}
  </div>
);

Card.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  cardModel: PropTypes.instanceOf(CardModel).isRequired,
};

export default Card;