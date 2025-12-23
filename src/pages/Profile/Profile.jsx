import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Profile.css';
import OrderCard from '../../components/Order Card/OrderCard';
import { FaUser, FaEdit, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';

const Profile = () => {
  const { user, logout, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  // Utility to format dates like "Jun 21, 2025"
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Utility to format numbers to currency strings like "$ 20,00"
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount).replace('$', '$ '); // Adding the space seen in your UI
  };

  // The mapper function for your UI
  const mapOrderToPresentation = (order) => {
    if (!order) return null;

    const product = order.Product || {};
    const addr = order.Address || {};
    const delivery = order.Delivery || {};

    // Map the integer status to the display label
    const statusLabels = {
      0: "Pesanan Dibuat",
      1: "Pembayaran Berhasil",
      2: "Pesanan Disiapkan",
      3: "Pesanan Dikirim",
      4: "Pesanan Tiba"
    };

    const addressParts = [
      addr.Detail,
      addr.District?.Name,
      addr.City?.Name,
      addr.Province?.Name,
      addr.PostalCode?.Name
    ].filter(Boolean);

    const fullAddress = addressParts.length > 0 
      ? addressParts.join(", ") 
      : "No address provided";

    return {
      orderId: order._id || "N/A",
      // Keep the integer for logic (progress bar) and string for labels
      statusInt: typeof order.Status === 'number' ? order.Status : 0,
      status: statusLabels[order.Status] || "Pesanan Dibuat",
      
      recipientName: addr.RecipientName || "Guest",
      recipientPhone: addr.RecipientNumber || "-",
      fullAddress: fullAddress,

      shippingCode: delivery.ShippingCode || "-",
      deliveryService: delivery.Service || "Standard",
      estimatedArrival: formatDate(delivery.EstimatedArrival),
      
      productName: product.Name || "Unknown Product",
      productImageUrl: product.Image || "",
      quantity: product.Quantity || 0,
      customizationDetails: product.Description ? product.Description.split('\n') : [],

      subtotalProduct: formatCurrency((product.Price || 0) * (product.Quantity || 0)),
      shippingFee: formatCurrency(5.00), 
      serviceFee: formatCurrency(2.00),
      discount: formatCurrency(-2.00),
      totalOrder: formatCurrency(((product.Price || 0) * (product.Quantity || 0)) + 5)
    };
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?._id) return;
      try {
        // NOTE: Ensure backend uses .populate({ path: 'Orders', populate: ['Product', 'Address', 'Delivery'] })
        const response = await fetch(`http://localhost:5000/api/users/orders/${user._id}`);
        const data = await response.json();
        if (response.ok) {
          setOrders(data.Orders || []);
          setFormData({ name: data.Name || "", email: data.Email || "", password: "", confirmPassword: "" });
        }
        console.log(data)
      } catch (err) {
        console.error("Fetch error:", err);
        setOrders([]);
      }
    };
    fetchUserData();
  }, [user?._id]);

  const handleGoBack = () => window.history.back();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
    setFormData({ name: user.Name, email: user.Email, password: "", confirmPassword: "" });
  };

  const isPasswordValid = formData.password !== "" && formData.password === formData.confirmPassword && /^[a-zA-Z0-9]+$/.test(formData.password);
  const canSave = isEditing && isPasswordValid && formData.name.trim() !== "" && formData.email.trim() !== "";

  const handleSave = async () => {
    if (!canSave) return;
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: formData.name, Email: formData.email, Password: formData.password }),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        login(updatedUser);
        setIsEditing(false);
        setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
        alert("Profile updated!");
      }
    } catch (error) { alert("Save error occurred."); }
  };

  const handleLogout = () => {
    logout();
    alert("Berhasil keluar.");
    navigate("/login"); // Redirect ke login setelah logout
  };

  return (
    <div className="ProfileContainer">
      <button className="BackButton" onClick={handleGoBack}>←</button>
      <div className="ProfileSection">
        <div className="ProfileHeader">
          <div className="ProfileInfo">
            <FaUser className="ProfilePicture" />
            <div>
              <h1 className="UserName txt-color-ternary">{formData.name}</h1>
              <p className="p1 txt-color-ternary" style={{ margin: 0 }}>{formData.email}</p>
            </div>
          </div>
          <div className="ProfileActions">
            <FaEdit onClick={() => setIsEditing(true)} style={{ cursor: 'pointer', color: isEditing ? '#a66d58' : 'inherit' }} />
            <FaSignOutAlt onClick={handleLogout} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        <div className="UserDetail">
          <div className="DetailRow">
            <div className="Label txt-color-ternary">
              <label>Name</label>
              <input name="name" type="text" value={formData.name} onChange={handleInputChange} readOnly={!isEditing} className={!isEditing ? "read-only-input" : ""} />
            </div>
            <div className="Label txt-color-ternary">
              <label>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleInputChange} readOnly={!isEditing} className={!isEditing ? "read-only-input" : ""} />
            </div>
          </div>
          <div className="DetailRow">
            <div className="Label txt-color-ternary">
              <label>Password</label>
              <input name="password" type="password" placeholder={isEditing ? "New Alphanumeric Password" : "********"} value={formData.password} onChange={handleInputChange} readOnly={!isEditing} className={!isEditing ? "read-only-input" : ""} />
            </div>
            <div className="Label txt-color-ternary">
              <label>Confirm Password</label>
              <input name="confirmPassword" type="password" placeholder={isEditing ? "Confirm Password" : "********"} value={formData.confirmPassword} onChange={handleInputChange} readOnly={!isEditing} className={!isEditing ? "read-only-input" : ""} />
            </div>
          </div>
          {isEditing && !isPasswordValid && <p className="ErrorMessage">Passwords must match and be alphanumeric.</p>}
        </div>

        {isEditing && (
          <div className="ButtonContainer">
            <button className="CancelButton" onClick={handleCancel}>Cancel</button>
            <button className="SaveButton" onClick={handleSave} disabled={!canSave}>Save</button>
          </div>
        )}

        <div className="MyOrderSection">
          <h2 className="txt-color-ternary">Pesanan Saya</h2>
          {(orders || []).length > 0 ? (
            orders.map((order) => (
              <OrderCard key={order._id} order={mapOrderToPresentation(order)} />
            ))
          ) : (
            <p className="txt-color-ternary">No orders yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;