import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosConfig';
import { BsEye, BsEyeSlash } from 'react-icons/bs'; // Import ikon toggle
import './EditProfile.css';

const EditProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: '',
    profilePicture: null,
  });

  const [userId, setUserId] = useState('');
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId'); // Ambil userId dari localStorage
        if (!token || !userId) {
          setError('Token atau User ID tidak ditemukan. Silakan login ulang.');
          return;
        }

        console.log('Token yang digunakan:', token);
        console.log('User ID yang digunakan:', userId);

        // Ambil data pengguna berdasarkan ID
        const response = await axiosInstance.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Respons API:', response.data);

        const userData = response.data.data; // Backend mengembalikan data pengguna tunggal
        if (userData) {
          setUserId(userData.id || '');
          setFormData({
            name: userData.name || '',
            profilePicture: null,
          });
          setPreviewUrl(userData.profileUrl || '/images/user.png'); // Sesuaikan properti URL gambar
        } else {
          setError('Data pengguna tidak ditemukan.');
        }
      } catch (err) {
        console.error('Error fetching user data:', err.message);
        console.error('Detail Error:', err.response?.data || err);
        setError('Gagal mengambil data pengguna.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit profile updates
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);

      if (formData.profilePicture) {
        formDataToSubmit.append('profilePicture', formData.profilePicture);
      }

      const response = await axiosInstance.patch(
        `/users/settings/profile/${userId}`,
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const updatedData = response.data.data;
      setFormData({
        name: updatedData.name || '',
        profilePicture: null,
      });

      setPreviewUrl(updatedData.profileUrl || '/images/user.png');
      setSuccess(response.data.message || 'Profil berhasil diperbarui!');
    } catch (err) {
      console.error('Error updating profile:', err.message);
      setError('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  // Submit password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError('Kata sandi baru dan konfirmasi tidak cocok.');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      if (!token || !userId) {
        setError('Token atau User ID tidak ditemukan. Silakan login ulang.');
        return;
      }

      const response = await axiosInstance.post(
        '/users/settings/change-password',
        {
          id: userId,
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword,
          confirmNewPassword: passwordData.confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setSuccess(response.data.message || 'Kata sandi berhasil diperbarui!');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Gagal memperbarui kata sandi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="side-buttons">
        <button
          className={`side-button ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Profil
        </button>
        <button
          className={`side-button ${activeTab === "password" ? "active" : ""}`}
          onClick={() => setActiveTab("password")}
        >
          Ubah Kata Sandi
        </button>
      </div>

      {activeTab === "profile" && (
        <form onSubmit={handleUpdateProfile} className="edit-profile-form">
          <div className="form-group">
            <div className="profile-picture-container">
              <img
                src={previewUrl || '/images/user.png'}
                alt="Profile"
                className="profile-avatar"
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Nama"
              className="edit-profile-input"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="edit-profile-button" disabled={loading}>
            {loading ? 'Loading...' : 'Simpan Perubahan'}
          </button>
        </form>
      )}

      {activeTab === "password" && (
        <form onSubmit={handleChangePassword} className="edit-profile-form">
          <div className="form-group password-input-container">
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Kata Sandi Lama"
              className="edit-profile-input password-input"
              value={passwordData.oldPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, oldPassword: e.target.value })
              }
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowOldPassword(!showOldPassword)}
              title={showOldPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            >
              {showOldPassword ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          <div className="form-group password-input-container">
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Kata Sandi Baru"
              className="edit-profile-input password-input"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowNewPassword(!showNewPassword)}
              title={showNewPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            >
              {showNewPassword ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          <div className="form-group password-input-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmNewPassword"
              placeholder="Konfirmasi Kata Sandi Baru"
              className="edit-profile-input password-input"
              value={passwordData.confirmNewPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })
              }
            />
            <span
              className="password-toggle-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              title={showConfirmPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            >
              {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="edit-profile-button" disabled={loading}>
            {loading ? 'Loading...' : 'Simpan Perubahan'}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
