import axios from "axios";

const request = axios.create({
  baseURL: 'http://flaundry.somee.com/api/',
//   baseURL: "https://tiktok.fullstack.edu.vn/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = user?.jwt;
    console.log(accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
