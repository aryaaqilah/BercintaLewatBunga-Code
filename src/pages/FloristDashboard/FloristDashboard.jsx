import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useAlert } from "../../contexts/AlertContext";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../assets/Logo/Logo_Primary_Light.png";
import { div } from "three/tsl";

const FloristSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setIsOpen(false);
    showAlert({
      msg: "Apakah anda yakin ingin keluar dari sistem?",
      confirmText: "Ya, Keluar",
      cancelText: "Batal",
      onConfirm: () => {
        logout();
        navigate("/login");
      }
    });
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div></div>
  );
};

export default FloristSidebar;