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

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobile]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    showAlert("Berhasil keluar.");
    setIsMobile(false);
  };

  return (
    <nav className="NavBar">
      <NavLink to="/" onClick={() => setIsMobile(false)} className="NavBarLogoContainer">
        <img src={PrimaryLogoLight} alt="Primary Logo" className="NavBarLogo" />
      </NavLink>

      <ul className={isMobile ? "NavBarLinks active" : "NavBarLinks"}>
        <li>
          <NavLink to="/" className="NavBarItem" onClick={() => setIsMobile(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" className="NavBarItem" onClick={() => setIsMobile(false)}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="NavBarItem" onClick={() => setIsMobile(false)}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/help" className="NavBarItem" onClick={() => setIsMobile(false)}>
            Help
          </NavLink>
        </li>

        {user ? (
          <>
            <li>
              <NavLink to="/profile" onClick={() => setIsMobile(false)}>
                <button className="NavBarButton">
                  <FaUser />
                  <span>{user.Name || "User"}</span>
                </button>
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="NavBarButton LogoutBtn">
                <FaSignOutAlt />
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" onClick={() => setIsMobile(false)}>
              <button className="NavBarButton">Login</button>
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