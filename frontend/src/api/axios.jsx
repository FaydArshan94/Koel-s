import axios from "axios"; // ✅ npm package se import karo

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
