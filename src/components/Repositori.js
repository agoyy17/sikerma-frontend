import React, { useState, useEffect } from 'react';
import './Repositori.css';
import axiosInstance from './axiosConfig';
import { useNavigate } from 'react-router-dom';
import commentIcon from './chat.png';
import downloadIcon from './download.png';

const Repositori = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCommentModal, setShowCommentModal] = useState(null);
  const [comment, setComment] = useState({});
  const [end_date, setEndDate] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Mengambil data repositori
  const fetchData = async () => {
    setLoading(true);
    try {
      // Ambil data dari ketiga endpoint
      const [repositoryResponse, addendumResponse, extensionResponse] = await Promise.all([
        axiosInstance.get('/repository'),
        axiosInstance.get('/addendum'),
        axiosInstance.get('/extension'),
      ]);
  
      // Gabungkan data dari ketiga sumber
      const combinedData = [
        ...repositoryResponse.data.data.map(item => ({ ...item, jenisPengajuan: 'Pengajuan baru' })),
        ...addendumResponse.data.data.map(item => ({ ...item, jenisPengajuan: 'Adendum' })),
        ...extensionResponse.data.data.map(item => ({ ...item, jenisPengajuan: 'Perpanjangan' })),
      ];
  
      console.log('Combined Data:', combinedData); // Cek data yang digabungkan
      setEntries(combinedData);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Ambil data repositori
  }, []);

  // Mengambil data pengguna yang login dan role
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
          setUserRole(userResponse.data.data.role); // Menyimpan data role pengguna
        } catch (err) {
          console.error('Gagal mengambil data pengguna:', err);
        }
      }
    };

    fetchUserData(); // Ambil data pengguna
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Kirim permintaan PATCH ke backend untuk memperbarui status
      const response = await axiosInstance.patch(`/repository/${id}`, { status: newStatus });
  
      if (response.status === 200) {
        // Perbarui state lokal dengan status yang baru
        const updatedEntries = entries.map((entry) =>
          entry.id === id ? { ...entry, status: newStatus } : entry
        );
        setEntries(updatedEntries);
        alert('Status berhasil diperbarui');
      } else {
        alert('Gagal memperbarui status');
      }
    } catch (error) {
      console.error('Gagal memperbarui status:', error);
      alert('Gagal memperbarui status');
    }
  };

  const handleCommentChange = (id, value) => {
    setComment({ ...comment, [id]: value });
  };

  const handleCommentSubmit = (id) => {
    const newComment = comment[id] || '';
    axiosInstance.patch(`/repository/${id}`, { comment: newComment })
      .then(() => { 
        alert('Komentar berhasil ditambahkan');
        setShowCommentModal(null);
        fetchData();  // Refresh data setelah update komentar
      })
      .catch(err => alert('Gagal menambahkan komentar'));
  };

  const handleEndDateChange = async (id, date) => {
    try {
      // Pastikan end_date dalam format ISO-8601 DateTime
      const isoDate = new Date(date).toISOString(); // Mengonversi ke format ISO-8601
  
      // Update end_date di tabel Repository
      await axiosInstance.patch(`/repository/${id}`, { end_date: isoDate });
  
      // Ambil data repositori yang baru di-update
      const updatedRepository = await axiosInstance.get(`/repository/${id}`);
      const repositoryData = updatedRepository.data.data;
  
      // Hitung schedule (misalnya, H-1 sebelum end_date)
      const scheduleDate = new Date(date); // Konversi end_date menjadi objek Date
      scheduleDate.setHours(0, 0, 0, 0);
      scheduleDate.setDate(scheduleDate.getDate() - 1); // Set 1 hari sebelum end_date
      const scheduleTime = scheduleDate.toISOString().slice(11, 16); // Ambil bagian jam dan menit (HH:MM)
  
      // Buat notifikasi berdasarkan end_date yang baru
      const notificationData = {
        title: "Pengingat Kerjasama",
        description: `Kerjasama "${repositoryData.partner_agencies}" akan berakhir pada ${date}.`,
        end_date: isoDate,  // Gunakan end_date yang sudah diubah ke ISO-8601
        userId: repositoryData.userId,
        category: "Reminder",  
        schedule: scheduleTime  // Format schedule menjadi HH:MM
      };
  
      // Post notifikasi ke tabel Notification
      const response = await axiosInstance.post("/notification", notificationData);
      console.log('Notifikasi berhasil dikirim:', response);
  
      alert('End Date berhasil diperbarui dan notifikasi telah dibuat.');
      fetchData(); // Refresh data setelah update
    } catch (err) {
      console.error('Gagal memperbarui End Date atau membuat notifikasi:', err);
      alert('Gagal memperbarui End Date atau membuat notifikasi.');
    }
  };
  
  // const handleDownload = (id) => {
  //   alert(`Mengunduh file untuk ID: ${id}`);
  //   const downloadLink = document.createElement('a');
  //   downloadLink.href = `/files/sample-file-${id}.pdf`;
  //   downloadLink.download = `file-${id}.pdf`;
  //   downloadLink.click();
  // };
  const handleDownload = (id) => {
    alert(`Mengunduh file untuk ID: ${id}`);
    
    // Membuat link download berdasarkan URL server
    const downloadLink = document.createElement('a');
    downloadLink.href = `/files/${id}`; // Menyesuaikan dengan endpoint yang dibuat di server
    downloadLink.download = `file-${id}.pdf`; // Nama file saat diunduh
    downloadLink.click();
  };
  

  const totalPages = Math.ceil(entries.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Slice entries based on the current page
  const paginatedEntries = entries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  console.log('Paginated Entries:', paginatedEntries);
  if (loading) return <p>Loading...</p>;

  // Cek jika role user termasuk Admin, Unit atau Staff
  const isRestrictedRole = ['Admin', 'Unit', 'Staff'].includes(userRole);
  console.log('User role :', userRole);
  return (
    <div className="repositori-layout">
      <h2>Repositori</h2>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Mitra</th>
            <th>Jenis Kerjasama</th>
            <th>Jenis Pengajuan</th>
            <th>Status</th>
            {isRestrictedRole && <th>Tanggal Berakhir</th>}
            <th>Komentar</th>
            {isRestrictedRole && <th>Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {paginatedEntries.map((entry, index) => (
            <tr key={entry.id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{entry.partner_agencies}</td>
              <td>{entry.type}</td>
              <td>{entry.jenisPengajuan}</td>
              <td>{entry.status}</td>
              {isRestrictedRole && (
                <td>
                  <input
                    type="date"
                    value={end_date[entry.id] || entry.end_date || ''}
                    onChange={(e) => handleEndDateChange(entry.id, e.target.value)}
                    placeholder="Pilih End Date"
                  />
                </td>
              )}
              <td>
                {isRestrictedRole ? (
                  <>
                    <button className="comment-icon-btn" onClick={() => setShowCommentModal(entry.id)}>
                      <img src={commentIcon} alt="Tambah Komentar" className="comment-icon" />
                    </button>
                    {showCommentModal === entry.id && (
                      <div className="comment-modal">
                        <div className="comment-modal-content">
                          <textarea
                            value={comment[entry.id] || ''}
                            onChange={(e) => handleCommentChange(entry.id, e.target.value)}
                            placeholder="Tambah komentar"
                            className="comment-textarea"
                          />
                          <button className="submit-btn" onClick={() => handleCommentSubmit(entry.id)}>
                            Submit
                          </button>
                          <button className="cancel-btn" onClick={() => setShowCommentModal(null)}>
                            Batal
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <span className="comment-text">{entry.comment || 'Belum ada komentar'}</span>
                )}
              </td>
              {isRestrictedRole && (
                <td>
                  <div className="button-group">
                    <button className="approve-btn" onClick={() => handleStatusChange(entry.id, 'Aktif')}>Setujui</button>
                    <button className="reject-btn" onClick={() => handleStatusChange(entry.id, 'NonAktif')}>Tolak</button>
                    <button
                      className="download-icon"
                      onClick={() => handleDownload(entry.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}>
                      <img src={downloadIcon} alt="Download" style={{ width: '34px', height: '40px', border: 'none' }} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Halaman ${currentPage} dari ${totalPages}`}</span>
        <button onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

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

      <section className="partner-logos">
        <h2 className="partner-title">Mitra Kami</h2>
        <div className="logo-container">
          <img src="./images/uthm.png" alt="Mitra 1" />
          <img src="./images/education.png" alt="Mitra 2" />
          <img src="./images/dayananda.png" alt="Mitra 3" />
        </div>
      </section>
    </div>
  );
};

export default Repositori;