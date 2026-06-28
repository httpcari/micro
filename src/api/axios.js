import axios from "axios";

const api = axios.create({
  baseURL: "https://micro-soft.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;