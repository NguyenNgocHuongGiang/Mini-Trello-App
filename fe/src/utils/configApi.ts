import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/",
});

interface AuthInfo {
    accessToken?: string;
}

api.interceptors.request.use((config: import("axios").InternalAxiosRequestConfig) => {
    const authInfo: AuthInfo = JSON.parse(
        localStorage.getItem("authInfo") || '{}'
    );

    const accessToken = authInfo.accessToken;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export default api;
