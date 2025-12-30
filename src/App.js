import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useCallback, useRef, useState } from "react";
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/footer";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Help from "./pages/Help/Help";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// import Customizer from "./pages/customizer";
import ARViewer from "./pages/ARViewer";
import Address from "./pages/Address/Address";
import Confirmation from "./pages/Confirmation/Confirmation";
import Payment from "./pages/Payment/Payment";
import Customizer from "./pages/Customizer/Customizer";
import Profile from "./pages/Profile/Profile";
import OrderDetail from "./pages/Order Detail/OrderDetail";
import AlertModal from "./components/AlertModal/AlertModal";
import IdleTimer from "./components/IdleTimer";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AlertProvider } from './contexts/AlertContext';
import { LoadingProvider } from './contexts/LoadingContext';

function AppContent() {
  const location = useLocation();
  
  const hideNavAndFooter = [
    "/login", "/register", "/profile", "/order-detail"
  ].includes(location.pathname);

  return (
    <>
      <IdleTimer timeout={300000} />
      {!hideNavAndFooter && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customizer" element={<Customizer />} />
          <Route path="/ar/:id" element={<ARViewer />} />
          <Route path="/address" element={<Address />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/payment" element={<Payment />} />
          {/* <Route path="/temp" element={<Temp />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/order-detail" element={<OrderDetail />} />
        </Routes>
      </main>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AlertProvider> 
          <LoadingProvider>
            <AppContent />
          </LoadingProvider>
        </AlertProvider>
      </Router>
    </AuthProvider>
  );
}