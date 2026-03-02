import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/Logo/Logo_Primary_Light.png";
import "./FloristSidebar.css";

const FloristSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [isGardenOpen, setIsGardenOpen] = useState(false);

  const handleBloomLogout = () => {
    setIsGardenOpen(false);
    showAlert({
      msg: "Apakah anda yakin ingin mengakhiri sesi merangkai bunga hari ini?",
      confirmText: "Keluar",
      cancelText: "Kembali",
      onConfirm: () => {
        logout();
        navigate("/login");
      },
    });
  };

  const toggleGarden = () => setIsGardenOpen(!isGardenOpen);
  const closeGarden = () => setIsGardenOpen(false);

  return (
    <>
      <div className="FloristBloomHeader">
        <img src={Logo} alt="Logo" className="FloristGardenLogo" />
        <button className="BloomMenuToggle" onClick={toggleGarden}>
          {isGardenOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <nav className={`FloristGardenNav ${isGardenOpen ? "bloom" : ""}`}>
        <div className="GardenTopSection">
          <div className="FloristGardenLogoContainer">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="FloristProfileBouquet">
            <img src="https://i.pravatar.cc/150?u=alexa" alt="Avatar" className="FloristPetalAvatar" />
            <div className="FloristSeedInfo">
              <h4 className="p2 weight-semibold">{user?.Name || "Alexa Rawles"}</h4>
              <p className="p3">{user?.email || "alexarawles@gmail.com"}</p>
            </div>
          </div>

          <div className="FloralLinkList">
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => isActive ? "PetalTab active" : "PetalTab"}
              onClick={closeGarden}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/inventory" 
              className={({ isActive }) => isActive ? "PetalTab active" : "PetalTab"}
              onClick={closeGarden}
            >
              Produk
            </NavLink>
            <NavLink 
              to="/manage-orders" 
              className={({ isActive }) => isActive ? "PetalTab active" : "PetalTab"}
              onClick={closeGarden}
            >
              Pesanan
            </NavLink>
          </div>
        </div>

        <button className="PetalLogoutBtn" onClick={handleBloomLogout}>
          <FaSignOutAlt /> Keluar
        </button>
      </nav>

      {isGardenOpen && <div className="GardenMistOverlay" onClick={closeGarden}></div>}
    </>
  );
};

export default FloristSidebar;