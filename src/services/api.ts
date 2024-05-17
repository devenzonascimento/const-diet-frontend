import axios from 'axios';

const token = localStorage.getItem("token")

export const api = axios.create({
  baseURL: 'http://localhost:3333', // substitua pelo URL do seu backend
  headers: {
    Authorization: `${token}`,
  },
});