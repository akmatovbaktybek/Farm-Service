import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://www.farm-service-kg.com/',
})

instance.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    }
)

instance.interceptors.request.use(
    (config) => {
        return config;
    },

    async (error) => {
        const originalRequest = { ...error.config };

        originalRequest._isRetry = true;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            try {
                const resp = await instance.get("/account/api/token/refresh");
                localStorage.setItem("token", resp.data.accesToken)
                return instance.request(originalRequest);
            } catch (error) {
                console.log('AUTH error');
            }
        }
        throw error;
    }
)





// import { KEY_TOKEN } from "../utils/constansts/";

// export const instance = axios.create({
//     BASE_URL: 'https://farm-service-kg.com',
// })

// instance.interceptors.request.use((config) => {
//     const token = localStorage.getItem(KEY_TOKEN);
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     } else {
//         delete config.headers.Authorization;
//     }
//     return config;
// });

// instance.interceptors.response.use(
//     (config) => {
//         return config;
//     },
//     async (error) => {
//         const originalRequest = { ...error.config };
//         originalRequest._isRetry = true;
//         if (error?.response?.status === 401 || error?.response?.status === 403) {
//             try {
//                 const resp = await instance.get("/account/api/token/refresh/");
//                 localStorage.setItem(KEY_TOKEN, resp.data.accessToken);
//                 return instance.request(originalRequest);
//             } catch (error) {
//                 console.log("AUTH ERROR");
//             }
//         }
//         throw error;
//     }
// );