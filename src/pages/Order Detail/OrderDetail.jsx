import React, { useRef, useState, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderDetail.css";

const OrderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentOrder = location.state?.orderData;

  const [progressWidth, setProgressWidth] = useState(0);
  const trackerRef = useRef(null);

  const getActiveStepIndex = () => {
    const rawStatus = currentOrder.status || "";
    const status = rawStatus.toUpperCase().trim();

    if (status.includes("PESANAN TIBA")) return 4;
    if (status.includes("PESANAN DIKIRIM")) return 3;
    if (status.includes("PESANAN DISIAPKAN")) return 2;
    if (status.includes("PEMBAYARAN BERHASIL")) return 1;
    if (status.includes("PESANAN DIBUAT")) return 0;

    return 0;
  };

  const activeStepIndex = currentOrder ? getActiveStepIndex() : 0;
  const totalSteps = 5;

  useLayoutEffect(() => {
    if (trackerRef.current && currentOrder) {
      const container = trackerRef.current;
      const containerWidth = container.clientWidth;
      const stepWidth = 24;
      const totalItemWidth = totalSteps * stepWidth;
      const spaceBetween = (containerWidth - totalItemWidth) / (totalSteps - 1);
      const activePosition =
        activeStepIndex * (stepWidth + spaceBetween) + stepWidth / 2;
      setProgressWidth(activePosition);
    }
  }, [activeStepIndex, totalSteps, currentOrder]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!currentOrder) {
    return (
      <div className="OrderDetailSection">
        <p>No order data found. Please select an order from your profile.</p>
        <button onClick={handleGoBack} className="primary-btn">
          Go Back
        </button>
      </div>
    );
  }

  const steps = [
    { label: "Pesanan Dibuat" },
    { label: "Pembayaran Berhasil" },
    { label: "Pesanan Disiapkan" },
    { label: "Pesanan Dikirim" },
    { label: "Pesanan Tiba" },
  ];

  return (
    <div className="OrderDetailSection">
      <button className="BackButton" onClick={handleGoBack}>
        ←
      </button>
      <h1 className="txt-color-primary">Order Details</h1>

      <div className="OrderDetailCard top-card">
        <div className="CardHeaderRow">
          <span className="txt-color-ternary">
            Order Number : {currentOrder.orderIdDisplay.replace("ORDER ", "")}
          </span>
          <a href="#" className="txt-color-ternary">
            Track your package
          </a>
        </div>

        <div className="OrderTracker" ref={trackerRef}>
          <div className="TrackerLineBackground"></div>

          <div
            className="TrackerLineProgress"
            style={{ width: `${progressWidth}px` }}
          ></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`StepItem ${index <= activeStepIndex ? "active" : ""}`}
            >
              <div
                className={`StepCircle ${
                  index <= activeStepIndex ? "active" : ""
                }`}
              ></div>
              <div className="txt-color-ternary">
                {step.label.split(" ").map((word, i) => (
                  <span key={i}>
                    {word}
                    <br />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="DeliverySummaryRow">
          <div className="delivery-info">
            <h3>Delivery Summary</h3>
            <div className="info-row">
              <span className="label">Shipping Code</span>
              <span className="value">
                : 9qgetbbqiqreq <button className="copy-btn">Salin</button>
              </span>
            </div>
            <div className="info-row">
              <span className="label">Services</span>
              <span className="value">: JnT</span>
            </div>
            <div className="info-row">
              <span className="label">Estimated Delivery</span>
              <span className="value">: {currentOrder.deliveryDate}</span>
            </div>
          </div>
          <div className="action-area">
            <button className="primary-btn">Pesanan Selesai</button>
          </div>
        </div>
      </div>

      <div className="OrderDetailCard bottom-card">
        <div className="customer-section">
          <h3>Customer Info</h3>
          <div className="info-grid">
            <span className="label">Name</span>
            <span className="value">: Alexa Rawles</span>
            <span className="label">Email</span>
            <span className="value link">: alexarawles@gmail.com</span>
            <span className="label">Phone</span>
            <span className="value">: 085861002700</span>
            <span className="label">Address</span>
            <span className="value">: {currentOrder.address}</span>
          </div>
          <a href="#" className="admin-link">
            Hubungi Admin
          </a>
        </div>

        <div className="summary-section">
          <h3>Order Summary</h3>
          <div className="product-item">
            <img
              src="https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=200&q=80"
              alt="Product"
              className="product-img"
            />
            <div className="product-details">
              <h4>{currentOrder.productName}</h4>
              <ul className="product-specs">
                {currentOrder.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
              <div className="qty-row">
                <span className="qty">x{currentOrder.qty}</span>
              </div>
              <div className="notes">
                <span className="note-label">description :</span>
                <p>{currentOrder.description.substring(0, 50)}...</p>
              </div>
            </div>
            <div className="product-price-display">
              {/* Penanganan harga yang lebih aman */}
              <span className="current-price">
                ${" "}
                {(
                  parseFloat(
                    currentOrder.total?.replace(/[^0-9.-]+/g, "") || 0
                  ) / (currentOrder.qty || 1)
                ).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="pricing-breakdown">
            <div className="price-row">
              <span>Subtotal Produk</span>
              {/* Penanganan harga yang lebih aman */}
              <span>
                ${" "}
                {(
                  parseFloat(
                    currentOrder.total?.replace(/[^0-9.-]+/g, "") || 0
                  ) - 10
                ).toFixed(2)}
              </span>
            </div>
            <div className="price-row">
              <span>Subtotal Pengiriman</span>
              <span>$ 10.00</span>
            </div>
            <div className="price-row total">
              <span>Total Pesanan</span>
              <span className="total-amount">{currentOrder.total}</span>
            </div>
            <div className="price-row payment">
              <span>Metode Pembayaran</span>
              <span className="method">QRIS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
