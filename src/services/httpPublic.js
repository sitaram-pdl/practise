import axios from 'axios';

const httpPublic = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 0,
});

export default httpPublic;
