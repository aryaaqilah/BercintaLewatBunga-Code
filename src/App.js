import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useCallback, useRef } from "react";
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/footer";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Help from "./pages/Help/Help";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Customizer from "./pages/Customizer";
import ARViewer from "./pages/ARViewer";
import Address from "./pages/Address/Address";
import Confirmation from "./pages/Confirmation/Confirmation";
import Payment from "./pages/Payment/Payment";
import Temp from "./pages/Temp/Temp";
import Profile from "./pages/Profile/Profile";
import OrderDetail from "./pages/Order Detail/OrderDetail";
import { AuthProvider, useAuth } from './AuthContext';

/**
 * IdleTimer Component:
 * Automatically logs out user after 5 minutes of inactivity.
 */
const IdleTimer = ({ timeout = 300000 }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const handleLogout = useCallback(() => {
    if (user) {
      logout();
      alert("Sesi anda telah berakhir karena tidak ada aktivitas.");
      navigate("/"); // Redirect to Home
    }
  }, [logout, navigate, user]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleLogout, timeout);
  }, [handleLogout, timeout]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    if (user) {
      resetTimer();
      events.forEach(event => document.addEventListener(event, resetTimer));
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(event => document.removeEventListener(event, resetTimer));
    };
  }, [user, resetTimer]);

  return null;
};

function AppContent() {
  const location = useLocation();
  
  // Define paths where Navbar and Footer should be hidden
  const hideNavAndFooter = [
    "/login", 
    "/register", 
    "/profile", 
    "/order-detail"
  ].includes(location.pathname);

  return (
    <>
      {/* Idle Timer logic inside the Auth provider and Router context */}
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
          <Route path="/temp" element={<Temp />} />
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
        <AppContent />
      </Router>
    </AuthProvider>
  );
}