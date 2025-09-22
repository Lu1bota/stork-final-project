import axios from "axios";

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});
