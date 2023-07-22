import axios from "axios";

const request = axios.create({
  baseURL: 'https://flaundry.somee.com/api/',
//   baseURL: "https://tiktok.fullstack.edu.vn/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token != null) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
