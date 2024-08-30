import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className='nav-bar'>
    <h1>HTC Fitness</h1>
    <ul>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/routines'>Routines</Link>
      </li>
      <li>
        <Link to='/goals'>Goals</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;