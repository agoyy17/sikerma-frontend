import React from 'react';
import { Link } from 'react-router-dom'; // Menggunakan Link dari React Router
import './Hero.css'; // Menghubungkan ke file CSS

const Hero = () => {
  return (
    <main>
      <section className="hero">
        <img src={process.env.PUBLIC_URL + '/images/kampus.png'} alt="Kerjasama Image" />
        <div className="overlay">
          <h1>Sistem Informasi Kerjasama Universitas Yarsi</h1>
          <Link to="/login" className="btn-masuk">Masuk</Link> {/* Ganti <a> dengan <Link> */}
        </div>
      </section>
    </main>
  );
};

export default Hero;
