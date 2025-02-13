import React, { useState, useRef, useEffect } from 'react';
import './Pengajuan.css';
import uploadIcon from "./edit.png"; // Pastikan edit.png berada di folder yang benar
import axiosInstance from './axiosConfig';

const Pengajuan = () => {
  // Data tabel MoU
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId'); // Pastikan userId ada di localStorage
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name_of_the_proposer: '',
    position: '',
    partner_agencies: '',
    scope: '',
    country: '',
    agency_category: '',
    type: '',
    upload_file: null,
    status: '',
  });

  // Referensi input file untuk setiap baris
  const fileInputRefs = useRef({});

  // Memuat entries dari localStorage saat pertama kali aplikasi dimulai
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/repository');
        const filteredData = response.data.data.filter(entry => entry.userId === userId);
        // setEntries(response.data.data);
        setEntries(filteredData);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const resetForm = () => {
    setFormData({
      name_of_the_proposer: '',
      position: '',
      partner_agencies: '',
      scope: '',
      country: '',
      agency_category: '',
      type: '',
      upload_file: null,
    });
  };

  const handleAddEntry = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, upload_file: e.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('authToken');
    const formDataToSend = new FormData();

    // Cek apakah formData sudah terisi dengan benar
    if (!formData.name_of_the_proposer || !formData.position || !formData.partner_agencies || !formData.scope || !formData.country || !formData.agency_category || !formData.type || !formData.upload_file) {
      alert('Semua field harus diisi!');
      return;
    }

    formDataToSend.append('name_of_the_proposer', formData.name_of_the_proposer);
    formDataToSend.append('position', formData.position);
    formDataToSend.append('partner_agencies', formData.partner_agencies);
    formDataToSend.append('scope', formData.scope);
    formDataToSend.append('country', formData.country);
    formDataToSend.append('agency_category', formData.agency_category);
    formDataToSend.append('type', formData.type);
    formDataToSend.append('upload_file', formData.upload_file);
    formDataToSend.append('userId', userId);

    try {
      // Mengirim data pengajuan ke server
      await axiosInstance.post('/repository', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      resetForm(); // Reset form setelah submit
      setIsModalOpen(false); // Menutup modal setelah submit
      alert('Pengajuan berhasil');

      // Fetch ulang data dari server setelah submit
      const updatedData = await axiosInstance.get('/repository');
      setEntries(updatedData.data.data);  // Update data entries dengan data terbaru

    } catch (error) {
      console.error('Terjadi kesalahan saat mengirim data:', error);
      alert('Terjadi kesalahan saat mengirim pengajuan.');
    }
  };

  const handleEditFile = (e, id) => {
    const updatedFile = e.target.files[0];
    const updatedEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, upload_file: updatedFile } : entry
    );
    setEntries(updatedEntries);
    alert(`File berhasil diperbarui untuk Mitra ID: ${id}`);
  };

  const triggerFileInput = (id) => {
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id].click();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mou-container">
      {/* Header */}
      <h2>Pengajuan Baru</h2>
      <button className="add-button" onClick={handleAddEntry}>
        + Tambahkan Pengajuan
      </button>

      {/* Tabel Data */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Mitra</th>
              <th>Status</th>
              <th>Edit File</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center' }}>
                  No data available in table
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.partner_agencies}</td>
                  <td>{entry.status}</td>
                  <td>
                    <input
                      type="file"
                      accept=".doc, .docx, .pdf"
                      ref={(el) => (fileInputRefs.current[entry.id] = el)}
                      style={{ display: 'none' }}
                      onChange={(e) => handleEditFile(e, entry.id)}
                    />
                    <button
                      onClick={() => triggerFileInput(entry.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <img
                        src={uploadIcon}
                        alt="Upload"
                        style={{ width: '24px', height: '24px' }}
                      />
                    </button>
                    {entry.upload_file && <span style={{ marginLeft: '10px' }}>{entry.upload_file.name}</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Pengajuan */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Tambahkan Pengajuan</h2>
              <button
                className="close-btn"
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
              >
                &times;
              </button>
            </div>

            <div className="modal-body" style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nama Pengusul</label>
                  <input
                    type="text"
                    name="name_of_the_proposer"
                    value={formData.name_of_the_proposer}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama pengusul"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Jabatan</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama jabatan"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Instansi Mitra</label>
                  <input
                    type="text"
                    name="partner_agencies"
                    value={formData.partner_agencies}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama instansi mitra"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Ruang lingkup</label>
                  <select
                    name="scope"
                    value={formData.scope}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Ruang Lingkup</option>
                    <option value="Domestik">Domestik</option>
                    <option value="Internasional">Internasional</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Negara</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Masukkan asal negara"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Kategori</label>
                  <select
                    name="agency_category"
                    value={formData.agency_category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Pemerintah">Pemerintah</option>
                    <option value="Industri">Industri</option>
                    <option value="Organisasi">Organisasi</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Bentuk Kerja Sama</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Bentuk Kerja Sama</option>
                    <option value="MoU">MoU</option>
                    <option value="MoA">MoA</option>
                    <option value="IA">IA</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Upload Draft</label>
                  <input
                    type="file"
                    accept=".doc, .docx, .pdf"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                  >
                    Batal
                  </button>
                  <button type="submit" className="submit-btn">
                    Simpan
                  </button>
                </div>
              </form>
            </div>
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
  
        {/* Bagian Mitra */}
        <section className="partner-logos">
          <h2 className="partner-title">Mitra Kami</h2>
          <div className="logo-container">
            <img src="./images/uthm.png" alt="Logo 2" className="partner-logo" />
            <img src="./images/education.png" alt="Logo 3" className="partner-logo" />
            <img src="./images/dayananda.png" alt="Logo 4" className="partner-logo" />
          </div>
        </section>
    </div>
  );
};

export default Pengajuan;
