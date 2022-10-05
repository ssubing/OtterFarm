import axios from "axios";

const HOST = "https://j7a606.p.ssafy.io:8080/api/";
const token = window.localStorage.getItem("token");
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: HOST,
  headers: { Authorization: `Bearer ${token}` },
});

export default api;
