import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";
import "./Navbar.css";
import PrimaryLogoLight from "../../assets/Logo/Logo_Primary_Light.png";
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobile]);

  const handleLogout = () => {
    setIsMobile(false);
    
    showAlert({
      msg: "Apakah anda yakin ingin berpamit saat ini?",
      confirmText: "Ya, Pamit",
      cancelText: "Tetap Bersama",
      onConfirm: () => {
        logout();
        navigate("/login");
        setTimeout(() => {
          showAlert("Hati-hati di jalan, sampai jumpa di musim bersemi berikutnya.");
        }, 500);
      }
    });
  };

  return (
    <nav className="NavBar">
      <NavLink to="/" onClick={() => setIsMobile(false)} className="NavBarLogoContainer">
        <img src={PrimaryLogoLight} alt="Primary Logo" className="NavBarLogo" />
      </NavLink>

      <ul className={isMobile ? "NavBarLinks active" : "NavBarLinks"}>
        <li>
          <NavLink to="/" className="NavBarItem" onClick={() => setIsMobile(false)}>
            Beranda
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" className="NavBarItem" onClick={() => setIsMobile(false)}>
            Toko
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="NavBarItem" onClick={() => setIsMobile(false)}>
            Tentang Kami
          </NavLink>
        </li>
        <li>
          <NavLink to="/help" className="NavBarItem" onClick={() => setIsMobile(false)}>
            Bantuan
          </NavLink>
        </li>

        {user ? (
          <>
            <li>
              <NavLink to="/profile" onClick={() => setIsMobile(false)}>
                <button className="NavBarButton">
                  <FaUser />
                  <p>{user.Name || "User"}</p>
                </button>
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="NavBarButton">
                <FaSignOutAlt />
                <p>Keluar</p>
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" onClick={() => setIsMobile(false)}>
              <button className="NavBarButton">Masuk</button>
            </NavLink>
          </li>
        )}
      </ul>

      <button className="MobileMenuIcon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
};

export default Navbar;