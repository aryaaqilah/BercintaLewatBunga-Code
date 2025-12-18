import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/footer";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Help from "./pages/Help/Help";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register"
import Customizer from "./pages/Customizer";
import ARViewer from "./pages/ARViewer";
import Address from "./pages/Address/Address";
import Confirmation from "./pages/Confirmation/Confirmation";
import Payment from "./pages/Payment/Payment";
import Temp from "./pages/Temp/Temp";
import Profile from "./pages/Profile/Profile";
import OrderDetail from "./pages/Order Detail/OrderDetail";
import { AuthProvider } from './AuthContext';

function AppContent() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/login" || location.pathname === "/register"|| location.pathname === "/profile" || location.pathname === "/order-detail";

  return (
    <>
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