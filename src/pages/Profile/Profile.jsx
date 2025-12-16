import React from 'react';
import './Profile.css';
import OrderCard from '../../components/Order Card/OrderCard';

const orderData = [
  {
    id: "ORDER-001",
    date: "June 21, 2025",
    total: "$ 120.00",
    address: "Jl. Jalan Jalan No. 12 Slipi Palmerah, DKI...",
    status: "PESANAN DIBUAT", 
    deliveryStatus: "",
    orderIdDisplay: "ORDER #1234567890ABCDEFGHIJ",
    productName: "3D Customize Bouquet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi",
    details: [
      "- 3 Rose",
      "- Yellow Wrapper",
      "- Customize Note card"
    ],
    qty: 2,
    deliveryDate: "June, 21, 2025",
    delivered: false
  },
  {
    id: "ORDER-002",
    date: "June 21, 2025",
    total: "$ 120.00",
    address: "Jl. Jalan Jalan No. 12 Slipi Palmerah, DKI...",
    status: "PEMBAYARAN BERHASIL",
    deliveryStatus: "",
    orderIdDisplay: "ORDER #1234567890ABCDEFGHIJ",
    productName: "3D Customize Bouquet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi",
    details: [
      "- 3 Rose",
      "- Yellow Wrapper",
      "- Customize Note card"
    ],
    qty: 2,
    deliveryDate: "June, 21, 2025",
    delivered: true
  },
  {
    id: "ORDER-002",
    date: "June 21, 2025",
    total: "$ 120.00",
    address: "Jl. Jalan Jalan No. 12 Slipi Palmerah, DKI...",
    status: "PESANAN DISIAPKAN",
    deliveryStatus: "",
    orderIdDisplay: "ORDER #1234567890ABCDEFGHIJ",
    productName: "3D Customize Bouquet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi",
    details: [
      "- 3 Rose",
      "- Yellow Wrapper",
      "- Customize Note card"
    ],
    qty: 2,
    deliveryDate: "June, 21, 2025",
    delivered: true
  },
  {
    id: "ORDER-002",
    date: "June 21, 2025",
    total: "$ 120.00",
    address: "Jl. Jalan Jalan No. 12 Slipi Palmerah, DKI...",
    status: "PESANAN DIKIRIM",
    deliveryStatus: "",
    orderIdDisplay: "ORDER #1234567890ABCDEFGHIJ",
    productName: "3D Customize Bouquet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi",
    details: [
      "- 3 Rose",
      "- Yellow Wrapper",
      "- Customize Note card"
    ],
    qty: 2,
    deliveryDate: "June, 21, 2025",
    delivered: true
  },
  {
    id: "ORDER-002",
    date: "June 21, 2025",
    total: "$ 120.00",
    address: "Jl. Jalan Jalan No. 12 Slipi Palmerah, DKI...",
    status: "PESANAN TIBA",
    deliveryStatus: "",
    orderIdDisplay: "ORDER #1234567890ABCDEFGHIJ",
    productName: "3D Customize Bouquet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi",
    details: [
      "- 3 Rose",
      "- Yellow Wrapper",
      "- Customize Note card"
    ],
    qty: 2,
    deliveryDate: "June, 21, 2025",
    delivered: true
  }
];

const handleGoBack = () => {
    window.history.back();
};

const Profile = () => {
  return (
    <div className="ProfileContainer">
      <button className="BackButton" onClick={handleGoBack}>←</button>

      <div className="ProfileSection">
        <div className="ProfileHeader">
          <div className="ProfilePicture">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
              alt="Alexa Rawles" 
              className="avatar" 
            />
          </div>
          <div>
            <h2 className="txt-color-ternary">Alexa Rawles</h2>
            <p className="p1 txt-color-ternary">alexarawles@gmail.com</p>
          </div>
        </div>

        <div className="UserDetail">
          <div className="DetailRow">
            <div className="Label txt-color-ternary">
              <label>First Name</label>
              <input className="txt-color-bg-dark" type="text" placeholder={"Alexa"} readOnly={true} />
            </div>
            <div className="Label txt-color-ternary">
              <label>Last Name</label>
              <input className="txt-color-bg-dark" type="text" placeholder={"Rawles"} readOnly={true} />
            </div>
          </div>
          <div className="DetailRow">
            <div className="Label txt-color-ternary">
              <label>Gender</label>
              <input className="txt-color-bg-dark" type="text" placeholder={"Female"} readOnly={true} />
            </div>
            <div className="Label txt-color-ternary">
              <label>Email</label>
              <input className="txt-color-bg-dark" type="email" placeholder={"alexarawles@gmail.com"} readOnly={true} />
            </div>
          </div>
        </div>

        <div className="MyOrderSection">
          <h2 className="txt-color-ternary">Pesanan Saya</h2>
          
          {orderData.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default Profile;