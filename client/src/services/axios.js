import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://coderoom-lgvp.onrender.com/api";

if (!import.meta.env.VITE_API_URL) {
  console.warn(
    "VITE_API_URL is not defined. Falling back to https://coderoom-lgvp.onrender.com/api. " +
      "Set VITE_API_URL in your deployment environment to avoid this fallback.",
  );
}

export const axiosInstace = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});