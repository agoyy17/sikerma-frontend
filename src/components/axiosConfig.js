import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // URL backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menyisipkan token Authorization hanya jika diperlukan
axiosInstance.interceptors.request.use((config) => {
  // Mengecek apakah request membutuhkan token
  if (!config.noAuth) { // Tambahkan flag `noAuth` pada config jika tidak membutuhkan token
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor untuk menangani respons dan error global
axiosInstance.interceptors.response.use(
  (response) => response, // Jika respons sukses, langsung kembalikan
  async (error) => {
    if (error.response) {
      // Jika error 401, coba refresh token
      if (error.response.status === 401 && !error.config._retry) {
        error.config._retry = true; // Flag untuk mencegah loop infinit
        try {
          const refreshToken = localStorage.getItem('refreshToken'); // Ambil refresh token
          const response = await axios.post(`${axiosInstance.defaults.baseURL}/users/refresh-token`, {
            token: refreshToken,
          });
          
          const newAccessToken = response.data.data.accessToken;
          localStorage.setItem('authToken', newAccessToken); // Simpan token baru
          error.config.headers.Authorization = `Bearer ${newAccessToken}`; // Update header
          return axiosInstance(error.config); // Kirim ulang request
        } catch (refreshError) {
          // Jika refresh token gagal, logout user
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login'; // Redirect ke halaman login
        }
      }
    }
    return Promise.reject(error); // Jika error lain, lemparkan kembali
  }
);

export default axiosInstance;
