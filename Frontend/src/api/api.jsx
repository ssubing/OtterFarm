import axios from "axios";

const HOST = "http://j7a606.p.ssafy.io:8080/api/";

axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: HOST,
});

export default api;
