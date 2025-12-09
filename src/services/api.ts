import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://pantrypal-p1re.onrender.com/api",
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    // Assuming token is stored in localStorage by Login component
    const token = localStorage.getItem("token");
    console.log("API Request:", config.url);
    console.log("Token from localStorage:", token);

    if (token) {
      config.headers["x-authorization"] = token;
      console.log("Attached x-authorization header");
    } else {
      console.warn("No token found in localStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
