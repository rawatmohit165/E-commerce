import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "applocation/json",
  },
});
export default axiosClient;
