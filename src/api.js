import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.180.131.150:8080/api',
});

export default api;
