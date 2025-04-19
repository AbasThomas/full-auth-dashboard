import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://ecommerce-backend-cxlj.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("API baseURL:", apiClient.defaults.baseURL);
export default apiClient;
