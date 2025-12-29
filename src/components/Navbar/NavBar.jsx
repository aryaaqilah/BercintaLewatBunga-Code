import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./Navbar.css";
import PrimaryLogoLight from "../../assets/Logo/Logo_Primary_Light.png";
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("Berhasil keluar.");
    navigate("/login"); // Redirect ke login setelah logout
  };

  return (
    <div className="NavBar">
      <NavLink to="/">
        <img src={PrimaryLogoLight} alt="Primary Logo" className="NavBarLogo" />
      </NavLink>

      <ul>
        <li><NavLink to="/shop" className="NavBarItem">Shop</NavLink></li>
        <li><NavLink to="/about" className="NavBarItem">About</NavLink></li>
        <li><NavLink to="/help" className="NavBarItem">Help</NavLink></li>

        {user ? (
          <>
            <li>
              <NavLink to="/profile">
                <button className="NavBarButton">
                  <FaUser />
                  {user.Name || "User"}
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
            <NavLink to="/login">
              <button className="NavBarButton">Login</button>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;