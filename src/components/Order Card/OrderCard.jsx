import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./OrderCard.css";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate('/order-detail', { state: { orderData: order } });
  };

  return (
    <div className="OrderCard txt-color-ternary">
      {/* Order Header Info */}
      <div className="OrderInfo">
        <div className="LeftItem">
          <div>
            <p className="p1">{order.status}</p>
            <span className="p2">{order.date}</span>
          </div>
          <div>
            <p className="p1">TOTAL</p>
            <span className="p2">{order.total}</span>
          </div>
          <div>
            <p className="p1">ALAMAT</p>
            <span className="p2">{order.address}</span>
          </div>
        </div>
        <div className="RightItem">
          <p className="p1">{order.deliveryStatus}</p>
          <span className="p2 tiny">{order.orderIdDisplay}</span>
        </div>
      </div>

      <div className="ProductDetail">
        <div className="ProductImage">
          <img
            src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=200&q=80"
            alt="Bouquet"
          />
        </div>

        <div className="LeftItem">
          <h2>{order.productName}</h2>
          <p className="p1">{order.description}</p>
          <ul className="p2 OrderList">
            {order.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        <div className="RightItem">
          <div className="Quantity">
            <span>Qty</span>
            <div className="QuantityBox">{order.qty}</div>
          </div>
          <button className="button-primary-fill" onClick={handleDetailClick}>
            Lihat Detail
          </button>
        </div>
      </div>

      <div className="OrderFooter">
        <div>
          <p className="p3">{order.delivered ? "Delivered : " : "Estimated Delivery : "}</p>
          <p className="p3">{order.deliveryDate}</p>
        </div>
        <a className="p2">Perlu Bantuan?</a>
      </div>
    </div>
  );
};

export default OrderCard;