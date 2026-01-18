import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.mode === "development" ? "http://localhost:5000/api" : "/api",   // set base url eger development modda ısek localhost:5000/api yi kullan ıse /api yi kullan
    withCredentials: true ,// allow us send cookies to backend
}
);

export default axiosInstance