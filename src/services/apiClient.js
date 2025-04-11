import axios from "axios";

const apiClient = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_API_BASE_URL
      : import.meta.env.VITE_API_BASE_URL_PROD,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("API baseURL:", apiClient.defaults.baseURL);
export default apiClient;
