import React, { useState, useEffect } from "react";
import axiosInstance from './axiosConfig';
import "./Mitra.css";

function Mitra() {
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [mitraData, setMitraData] = useState([]); // State untuk menyimpan data mitra

  // Mengambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authToken'); // Ambil token dari localStorage
      if (!token) {
        console.error("Token tidak ditemukan");
        return;
      }

      try {
        const response = await axiosInstance.get('/repository', {
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token ke header
          },
        });
        const data = response.data.data; // Sesuaikan dengan struktur data yang diterima

        // Memetakan data yang diambil ke format yang sesuai
        const mappedData = data.map(item => ({
          partner_agencies: item.partner_agencies,
          scope: item.scope,
          country: item.country,
          agency_category: item.agency_category,
          end_date: item.end_date,
          detail: {
            type: item.type,
            deskripsi: item.deskripsi,
            end_date: item.end_date,
            status: item.status,
            name_of_the_proposer: item.name_of_the_proposer,
          }
        }));

        setMitraData(mappedData); // Set data ke state
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDetailClick = (mitra) => {
    setDetail(mitra.detail);
    setShowModal(true);
  };

  return (
    <div className="daftar-mitra-container">
      <div className="filters">
        <select>
          <option>Semua Kategori</option>
        </select>
        <select>
          <option>Semua Negara</option>
        </select>
        <select>
          <option>Semua Mitra</option>
        </select>
        <input type="text" placeholder="Kata Kunci" />
        <button>Search</button>
      </div>

      <table className="mitra-table">
        <thead>
          <tr>
            <th>Nama Mitra</th>
            <th>Kategori</th>
            <th>Negara</th>
            <th>Jenis</th>
            <th>Berakhir</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {mitraData.map((mitra, index) => (
            <tr key={index}>
              <td>{mitra.partner_agencies}</td>
              <td>{mitra.scope}</td>
              <td>{mitra.country}</td>
              <td>{mitra.agency_category}</td>
              <td>{mitra.end_date}</td>
              <td>
                <button
                  className="detail-button"
                  onClick={() => handleDetailClick(mitra)}
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <p>Jenis Kerjasama: {detail.type}</p>
            <p>Deskripsi Kerjasama: {detail.deskripsi}</p>
            <p>Masa Berlaku: {detail.end_date}</p>
            <p>Status: {detail.status}</p>
            <p>Penggiat Kerjasama: {detail.name_of_the_proposer}</p>
          </div>
        </div>
      )}

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

      {/* Bagian baru untuk logo mitra */}
      <section className="partner-logos">
        <h2 className="partner-title">Mitra Kami</h2>
        <div className="logo-container">
          <img src='./images/uthm.png' alt="Logo 2" className="partner-logo" />
          <img src='./images/education.png' alt="Logo 3" className="partner-logo" />
          <img src='./images/dayananda.png' alt="Logo 4" className="partner-logo" />
        </div>
      </section>
    </div>
  );
}

export default Mitra;