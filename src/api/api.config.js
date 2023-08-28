import axios from "axios";
import { KEY_TOKEN } from "../utils/constansts/";

export const instance = axios.create({
    BASE_URL: 'https://farm-service-kg.com',
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem(KEY_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

instance.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = { ...error.config };
        originalRequest._isRetry = true;
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            try {
                const resp = await instance.get("/account/api/token/refresh/");
                localStorage.setItem(KEY_TOKEN, resp.data.accessToken);
                return instance.request(originalRequest);
            } catch (error) {
                console.log("AUTH ERROR");
            }
        }
        throw error;
    }
);