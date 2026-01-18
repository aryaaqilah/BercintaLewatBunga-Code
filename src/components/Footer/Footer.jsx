import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import PrimaryLogoLight from "../../assets/Logo/Logo_Primary_Light.png";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="FooterContainer">
        {/* Kolom 1: Logo & Slogan */}
        <div className="FooterBrand">
          <img src={PrimaryLogoLight} alt="Florist3D Logo" className="FooterLogo" />
          <p className="FooterSlogan">
            Mengabadikan detak waktu dalam kelopak yang abadi.
          </p>
        </div>

        {/* Kolom 2: Navigasi Cepat */}
        <div className="FooterNav">
          <h4 className="FooterTitle">Navigasi</h4>
          <NavLink to="/shop" className="FooterLink">Toko</NavLink>
          <NavLink to="/about" className="FooterLink">Tentang Kami</NavLink>
          <NavLink to="/help" className="FooterLink">Bantuan</NavLink>
        </div>

        {/* Kolom 3: Kontak & Sosial Media */}
        <div className="FooterSocial">
          <h4 className="FooterTitle">Sapa Kami</h4>
          <div className="FooterIcons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://wa.me/yournumber" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
            <a href="mailto:hello@florist3d.com"><FaEnvelope /></a>
          </div>
          <p className="p3">Tangerang, Indonesia</p>
        </div>
      </div>

      <div className="FooterBottom">
        <p className="p3">© {new Date().getFullYear()} Florist3D. Merajut Kenangan Seumur Hidup.</p>
      </div>
    </footer>
  );
}