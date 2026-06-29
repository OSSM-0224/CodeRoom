import axios from "axios";


export const axiosInstace = axios.create({
    baseURL: "/api",
    withCredentials: true
})