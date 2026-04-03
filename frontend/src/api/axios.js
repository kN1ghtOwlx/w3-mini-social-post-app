import axios from "axios";

const api = axios.create({
    baseURL: "https://w3-mini-social-post-app.onrender.com/api",
    withCredentials: true
})

export default api;