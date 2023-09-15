import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 0,
});

// http.interceptors.request.use(
//   (config) => {
//     if (getToken()) {
//       config.headers["Authorization"] = `Bearer ${getToken()}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default http;
