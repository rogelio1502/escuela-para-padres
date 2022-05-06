import axios from "axios";
const instance = axios.create({
  // baseURL: "https://escuela-para-padres-api.herokuapp.com",
  baseURL: "http://localhost:7777",
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
