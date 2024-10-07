import React from 'react';
import './Header.css'; // Menghubungkan ke file CSS

const Header = () => {
  return (
    <header>
      <div className="top-bar">
        <p>SELAMAT DATANG DI UNIVERSITAS YARSI</p>
      </div>
      <nav className="navbar">
        <div className="logo">
          <img src={process.env.PUBLIC_URL + '/images/logo-yarsi.png'} alt="Universitas Yarsi Logo" />
        </div>
        <ul className="nav-links">
          <li><a href="#">HOME</a></li>
          <li><a href="#">MITRA</a></li>
          <li><a href="#">PROFIL</a></li>
          <li><a href="#">LAYANAN</a></li>
          <li><a href="#">PANDUAN</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
