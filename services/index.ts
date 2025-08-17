import axios from "axios";

export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
export const isClient = typeof window !== "undefined";

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9999/api/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
