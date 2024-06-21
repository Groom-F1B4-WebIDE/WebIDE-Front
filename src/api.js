import axios from 'axios';

const api = axios.create({
  baseURL: 'http://43.203.243.249:8000/'
});

export default api;
