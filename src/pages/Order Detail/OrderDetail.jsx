import React, { useRef, useState, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // The order object comes from the Profile page via navigate state
  const currentOrder = location.state?.orderData;

  const [progressWidth, setProgressWidth] = useState(0);
  const trackerRef = useRef(null);

  // Use the integer passed from the presentation model (0-4)
  const activeStepIndex = currentOrder?.statusInt ?? 0;
  const totalSteps = 5;

  const steps = [
    { label: "Pesanan Dibuat" },
    { label: "Pembayaran Berhasil" },
    { label: "Pesanan Disiapkan" },
    { label: "Pesanan Dikirim" },
    { label: "Pesanan Tiba" },
  ];

  useLayoutEffect(() => {
    if (trackerRef.current && currentOrder) {
      const container = trackerRef.current;
      const containerWidth = container.clientWidth;

      // Based on the UI, the circle diameter is approx 24px
      const stepWidth = 24;
      const totalItemWidth = totalSteps * stepWidth;

      // Calculate spacing between the circles
      const spaceBetween = (containerWidth - totalItemWidth) / (totalSteps - 1);

      // Calculate how far the progress line should travel
      const activePosition =
        activeStepIndex * (stepWidth + spaceBetween) + stepWidth / 2;

      setProgressWidth(activePosition);
    }
  }, [activeStepIndex, totalSteps, currentOrder]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCopyCode = () => {
    if (currentOrder?.shippingCode) {
      navigator.clipboard.writeText(currentOrder.shippingCode);
      alert("Shipping code copied!");
    }
  };

  if (!currentOrder) {
    return (
      <div className="OrderDetailSection">
        <p>No order data found. Please select an order from your profile.</p>
        <button onClick={handleGoBack} className="button-primary">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="OrderDetailSection">
      <button className="PrimaryBackButton" onClick={handleGoBack}>
        ←
      </button>
      <h1 className="txt-color-primary">Detail Pesanan</h1>

      {/* TOP CARD: Tracker and Delivery Summary */}
      <div className="OrderDetailCard top-card">
        <div className="OrderDetailCardHeaderRow">
          <span className="txt-color-ternary">
            Nomor Pesanan : #{currentOrder.orderId}
          </span>
          <a href="#" className="txt-color-ternary underline">
            Track your package
          </a>
        </div>

        {/* Dynamic Tracker Line */}
        <div className="OrderTracker" ref={trackerRef}>
          <div className="OrderDetailTrackerLineBackground"></div>
          <div
            className="OrderDetailTrackerLineProgress"
            style={{ width: `${progressWidth}px` }}
          ></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className={`OrderDetailStepItem ${
                index <= activeStepIndex ? "active" : ""
              }`}
            >
              <div
                className={`OrderDetailStepCircle ${
                  index <= activeStepIndex ? "active" : ""
                }`}
              ></div>
              <div className="txt-color-ternary step-label">
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

        <div className="OrderDetailDeliverySummaryRow">
          <div className="txt-color-ternary">
            <h3>Delivery Summary</h3>
            <div className="DeliveryInfoRow">
              <span className="label">Shipping Code</span>
              <span className="value">
                : {currentOrder.shippingCode}{" "}
                <button className="CopyButton" onClick={handleCopyCode}>
                  Salin
                </button>
              </span>
            </div>
            <div className="DeliveryInfoRow">
              <span className="label">Services</span>
              <span className="value">: {currentOrder.deliveryService}</span>
            </div>
            <div className="DeliveryInfoRow">
              <span className="label">Estimated Delivery</span>
              <span className="value">: {currentOrder.estimatedArrival}</span>
            </div>
          </div>
          <div className="action-area">
            <button className="button-primary">Pesanan Selesai</button>
          </div>
        </div>
      </div>

      {/* BOTTOM CARD: Customer Info and Order Summary */}
      <div className="OrderDetailCard OrderDetailBottomCard txt-color-ternary">
        <div className="OrderDetailCustomerSection">
          <h3>Customer Info</h3>
          <div className="OrderDetailInfoGrid">
            <span className="label">Name</span>
            <span className="value">: {currentOrder.recipientName}</span>
            <span className="label">Email</span>
            <span className="value link">
              : {currentOrder.email || "user@email.com"}
            </span>
            <span className="label">Phone</span>
            <span className="value">: {currentOrder.recipientPhone}</span>
            <span className="label">Address</span>
            <span className="value">: {currentOrder.fullAddress}</span>
          </div>
          <a href="#" className="OrderDetailContactAdmin txt-color-ternary">
            Hubungi Admin
          </a>
        </div>

        <div>
          <h3>Order Summary</h3>
          <div className="OrderDetailProductItem">
            <img
              src={currentOrder.productImageUrl}
              alt="Product"
              className="OrderDetailProductImage"
            />
            <div className="OrderDetailProductDetails">
              <h3>{currentOrder.productName}</h3>
              <ul className="OrderDetailProductItems">
                {currentOrder.customizationDetails.map((detail, i) => (
                  <li key={i}>- {detail}</li>
                ))}
              </ul>
              <div className="OrderDetailQuantityRow">
                <span className="qty">x{currentOrder.quantity}</span>
                <span className="price-at-qty">
                  {currentOrder.subtotalProduct}
                </span>
              </div>
              <div className="OrderDetailNotes">
                <span className="p3 OrderDetailNoteLabel">OrderDetailNotes :</span>
                <p className="p3">{currentOrder.customerRequestNote || "tidak ada catatan"}</p>
              </div>
            </div>
          </div>

          <div className="OrderDetailPricingBreakdown">
            <div className="OrderDetailPriceRow">
              <span>Subtotal Produk</span>
              <span>{currentOrder.subtotalProduct}</span>
            </div>
            <div className="OrderDetailPriceRow">
              <span>Subtotal Pengiriman</span>
              <span>{currentOrder.shippingFee}</span>
            </div>
            <div className="OrderDetailPriceRow">
              <span>Biaya Layanan</span>
              <span>{currentOrder.serviceFee}</span>
            </div>
            <div className="OrderDetailPriceRow">
              <span>Diskon</span>
              <span className="discount-text">{currentOrder.discount}</span>
            </div>
            <div className="OrderDetailPriceRow total">
              <h3 className="weight-bold">Total Pesanan</h3>
              <h3 className="weight-bold">{currentOrder.totalOrder}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
