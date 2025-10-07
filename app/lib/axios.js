import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});
export default axios;
