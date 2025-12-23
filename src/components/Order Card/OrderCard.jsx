import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderCard.css";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    // Passing the mapped order object to the detail page
    navigate('/order-detail', { state: { orderData: order } });
  };

  return (
    <div className="OrderCard txt-color-ternary">
      {/* Order Header Info */}
      <div className="OrderInfo">
        <div className="LeftItem">
          <div>
            <p className="p1">STATUS PESANAN</p>
            <span className="p2">{order.status}</span>
          </div>
          <div>
            <p className="p1">TOTAL</p>
            <span className="p2">{order.totalOrder}</span>
          </div>
          <div>
            <p className="p1">ALAMAT</p>
            {/* The model now provides a single flattened fullAddress string */}
            <span className="p2">{order.fullAddress}</span>
          </div>
        </div>
        <div className="RightItem">
          {/* Mapping to the "DALAM PENGIRIMAN" or status header in the top right */}
          <p className="p1">DALAM PENGIRIMAN</p> 
          <span className="p2 tiny">ORDER #{order.orderId}</span>
        </div>
      </div>

      <div className="ProductDetail">
        <div className="ProductImage">
          <img
            src={order.productImageUrl}
            alt={order.productName}
          />
        </div>

        <div className="LeftItem">
          <h2>{order.productName}</h2>
          <p className="p1">{order.productDescription}</p>
          <ul className="p2 OrderList">
            {/* customizationDetails is the array from our mapper */}
            {order.customizationDetails && order.customizationDetails.map((detail, index) => (
              <li key={index}>- {detail}</li>
            ))}
          </ul>
        </div>

        <div className="RightItem">
          <div className="Quantity">
            <span>Qty</span>
            <div className="QuantityBox">{order.quantity}</div>
          </div>
          <button className="button-primary-fill" onClick={handleDetailClick}>
            Liat Detail
          </button>
        </div>
      </div>

      <div className="OrderFooter">
        <div>
          {/* Using the estimatedArrival field from the model */}
          <span className="p3">Estimated Delivery : </span>
          <span className="p3">{order.estimatedArrival}</span>
        </div>
        <a href="#admin" className="p2">Hubungi Admin</a>
      </div>
    </div>
  );
};

export default OrderCard;