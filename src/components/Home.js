// Home.js
import React from 'react';
import './Home.css';
// import worldmap from '/images/worldmap.png'; // Pastikan file gambar worldMap ada di dalam folder yang sama atau sesuaikan path-nya.

const Home = () => {
  return (
    <div className="home-container">
      <section className="map-section">
        <img src={'/images/mapworld.png'} alt="Peta Kerjasama Global" className="map-image" />
      </section>
      <section className="info-section">
        <p>
          Secara Global, Universitas Yarsi menjalin kerjasama sebanyak...., baik <strong>Domestik</strong> maupun <strong>Internasional</strong>, termasuk diantaranya
        </p>
        <button className="btn-mitra">Daftar Semua Mitra →</button>
      </section>
    </div>
  );
};

export default Home;
