import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosConfig'; // Pastikan Anda memiliki konfigurasi axios
import './Beranda.css';
import WorldMap from './WorldMap';
import DoughnutChart from './DoughnutChart';

const Beranda = () => {
  const navigate = useNavigate();

  // State untuk data repositori dan pengguna
  const [repositories, setRepositories] = useState([]);
  const [userRole, setUserRole] = useState(null); // Menyimpan data pengguna yang login
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPengajuanSubMenu, setShowPengajuanSubMenu] = useState(false);

  // Mengambil data pengguna yang login dan repositori
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      if (token) {
        try {
          const userResponse = await axiosInstance.get(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Kirim token untuk autentikasi
            },
          });
          setUserRole(userResponse.data.data.role); // Menyimpan data pengguna
        } catch (err) {
          setError('Gagal mengambil data pengguna');
        }
      }
    };

    const fetchRepositories = async () => {
      try {
        const response = await axiosInstance.get('/repository');
        setRepositories(response.data.data); // Data repositori
        setLoading(false);
      } catch (err) {
        setError('Gagal memuat data repositori.');
        setLoading(false);
      }
    };

    fetchUserData(); // Ambil data pengguna
    fetchRepositories(); // Ambil data repositori
  }, []);

  useEffect(() => {
    console.log('Updated userRole:', userRole); // Memastikan role diperbarui
  }, [userRole]);
  if (loading) {
    return <div className="loading">Memuat data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }


  console.log(userRole)

  const isRestrictedRole = ['Admin', 'Unit', 'Staff'].includes(userRole);
  return (
    <div className="beranda-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul className="sidebar-menu">
          <li>
            <button className="sidebar-button" onClick={() => navigate('/repositori')}>
              Repositori
            </button>
          </li>

          {!isRestrictedRole && (
          <li>
            <button
              className="sidebar-button"
              onClick={() => setShowPengajuanSubMenu(!showPengajuanSubMenu)}
            >
              Pengajuan
            </button>
            {showPengajuanSubMenu && (
              <div style={{ marginLeft: '20px', marginTop: '10px' }}>
                <div style={{ display: 'flex' }}>
                  <button
                    className="sidebar-button"
                    style={{ width: '180px', marginRight: '10px' }}
                    onClick={() => navigate('/pengajuan-baru')}
                  >
                    Pengajuan Baru
                  </button>
                </div>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                  <button
                    className="sidebar-button"
                    style={{ width: '180px', marginRight: '10px' }}
                    onClick={() => navigate('/perpanjangan')}
                  >
                    Perpanjangan
                  </button>
                </div>
                <div style={{ display: 'flex', marginTop: '10px' }}>
                  <button
                    className="sidebar-button"
                    style={{ width: '180px', marginRight: '10px' }}
                    onClick={() => navigate('/adendum')}
                  >
                    Pengajuan Adendum
                  </button>
                </div>
              </div>
            )}
          </li>
          )}
        </ul>
      </aside>

      {/* Kontainer beranda */}
      <div className="beranda-container">
        <section className="map-section">
          <WorldMap />
        </section>

        <section className="info-section">
          <p>
            Universitas Yarsi menjalin <strong>{repositories.length}</strong> kerja sama, baik <strong>Domestik</strong> maupun <strong>Internasional</strong>.
          </p>
          <button className="btn-mitra" onClick={() => navigate('/mitra')}>
            Daftar Semua Mitra →
          </button>
        </section>

        <div className="home-content">
          <div className="content-box">
            <h2>Kerja Sama <span className="highlight">Domestik</span></h2>
            <p>Berdasarkan data repositori:</p>
            <p className="cooperation-type">MoU</p>
            <hr />
            <p className="cooperation-type">MoA/IA</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '70%' }}>70%</div>
            </div>
          </div>

          <div className="content-box">
            <h2>Kerja Sama <span className="highlight">Internasional</span></h2>
            <p>Berdasarkan data repositori:</p>
            <p className="cooperation-type">MoU</p>
            <hr />
            <p className="cooperation-type">MoA/IA</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '40%' }}>40%</div>
            </div>
          </div>
        </div>

        <section className="chart-section">
          <DoughnutChart />
        </section>

        {/* Berita Terbaru */}
        <div className="home-news">
          <h2 className="news-title">Berita Terbaru</h2>
          <div className="news-container">
            <div className="news-item">
              <img src="/images/riset.png" alt="Berita 1" />
              <p>Selesaikan Tugas Akhir: Mahasiswa Melakukan Riset Buat...</p>
            </div>
            <div className="news-item">
              <img src="/images/india.png" alt="Berita 2" />
              <p>Kolaborasi Riset: Universitas Yarsi dengan Institusi Internasional...</p>
            </div>
            <div className="news-item">
              <img src="/images/peresmian.png" alt="Berita 3" />
              <p>Acara Pembukaan Program Studi Baru di Fakultas Kedokteran...</p>
            </div>
          </div>
        </div>

        {/* Logo Mitra */}
        <section className="partner-logos">
          <h2 className="partner-title">Mitra Kami</h2>
          <div className="logo-container">
            <img src="./images/uthm.png" alt="Logo 1" className="partner-logo" />
            <img src="./images/education.png" alt="Logo 2" className="partner-logo" />
            <img src="./images/dayananda.png" alt="Logo 3" className="partner-logo" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Beranda;
