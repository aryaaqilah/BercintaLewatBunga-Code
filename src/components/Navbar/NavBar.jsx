import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./Navbar.css";
import PrimaryLogoLight from "../../assets/Logo/Logo_Primary_Light.png";

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

        {/* 2. Logika Kondisional: User Login vs Belum Login */}
        {user ? (
          <>
            {/* Jika SUDAH login: Tampilkan Nama User & Logout */}
            <li>
              <NavLink to="/profile">
                <button className="NavBarButton">
                  {/* Gunakan data user dari context (misal: user.Name) */}
                  Hi, {user.Name || "User"}
                </button>
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout} className="NavBarButton LogoutBtn">
                Logout
              </button>
            </li>
          </>
        ) : (
          /* Jika BELUM login: Tampilkan tombol Login saja */
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