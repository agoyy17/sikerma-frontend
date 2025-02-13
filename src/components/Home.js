import React from 'react';
import './Home.css';
import WorldMap from './WorldMap';
import DoughnutChart from './DoughnutChart';
import Mitra from './Mitra';

const Home = () => {
  return (
    <div className="home-container">
      {/* Bagian Peta Kerjasama */}
      <section className="map-section">
        <WorldMap/>
      </section>

      <section className="info-section">
        <p>
          Secara Global, Universitas Yarsi menjalin kerjasama sebanyak...., baik <strong>Domestik</strong> maupun <strong>Internasional</strong>, termasuk diantaranya
        </p>
        <button className="btn-mitra">Daftar Semua Mitra →</button>
      </section>

      <div className="home-content">

        <div className="content-box">
          <h2>Kerja Sama <span className="highlight">Domestik</span></h2>
          <p>Berdasarkan bentuk, jenis mitra, kerja sama:</p>
          <p className="cooperation-type">MoU</p>
          <hr />
          <p className="cooperation-type">MoA/IA</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '70%' }}>70%</div>
          </div>
        </div>

        {/* Kerja Sama Internasional */}
        <div className="content-box">
          <h2>Kerja Sama <span className="highlight">Internasional</span></h2>
          <p>Berdasarkan bentuk, jenis mitra, kerja sama:</p>
          <p className="cooperation-type">MoU</p>
          <hr />
          <p className="cooperation-type">MoA/IA</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '40%' }}>40%</div>
          </div>
        </div>
      </div>

      {/* Bagian Chart Kerjasama */}
      <section className="chart-section">
        <DoughnutChart />
          </section>
      
      {/* Bagian Tabel Mitra */}
      <section className="mitra-section">
        <Mitra />
      </section>
      
    </div>
  );
};

export default Home;
