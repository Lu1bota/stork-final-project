import axios from "axios";

export const nextServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
 
});

// ===== Authorization для кожного запиту =====
nextServer.interceptors.request.use((config) => {
  const access =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (access) config.headers.Authorization = `Bearer ${access}`;
  return config;
});

// ===== Авто-оновлення токена по 401 та ретрай =====
let refreshing: Promise<void> | null = null;

nextServer.interceptors.response.use(
  (r) => r,
  async (error) => {
    const { response, config } = error || {};
    if (response?.status === 401 && !config._retry) {
      config._retry = true;

      if (!refreshing) {
        refreshing = nextServer
          .post("/auth/refresh", {}) // бек читає refreshToken з cookie
          .then((res) => {
            const token =
              res.data?.data?.accessToken ?? res.data?.accessToken ?? null;
            if (token) {
              localStorage.setItem("accessToken", token);
              nextServer.defaults.headers.Authorization = `Bearer ${token}`;
            }
          })
          .finally(() => {
            refreshing = null;
          });
      }

      await refreshing;
      return nextServer(config); // повторити оригінальний запит
    }
    return Promise.reject(error);
  }
);
