import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import primary_logo_light from '../../assets/Logo/Logo_Primary_Light.png'

const Navbar = () => {
  return (
    <div className='NavBar'>
      <NavLink to="/"><img src={primary_logo_light} alt="Primary Logo" className='NavBarLogo' /></NavLink>

      <ul>
        <li><NavLink to="/shop" className="NavBarItem">Shop</NavLink></li>
        <li><NavLink to="/about" className="NavBarItem">About</NavLink></li>
        <li><NavLink to="/help" className="NavBarItem">Help</NavLink></li>
        <li><NavLink to="/login" className="NavBarItem">Login</NavLink></li>
      </ul>
    </div>
  )
}

export default Navbar
