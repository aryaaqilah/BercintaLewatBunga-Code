import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/footer";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Customizer from "./pages/Customizer";
import ARViewer from "./pages/ARViewer";
import Address from "./pages/Address/Address";
import Confirmation from "./pages/Confirmation/Confirmation";
import Payment from "./pages/Payment/Payment";
import Temp from "./pages/Temp/Temp";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 z-10">
            <Navbar />
        </div>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customizer" element={<Customizer />} />
            <Route path="/ar/:id" element={<ARViewer />} />
            <Route path="/address" element={<Address />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/temp" element={<Temp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
);
}
