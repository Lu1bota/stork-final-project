import { nextServer } from "./api";
import { User } from "@/types/user";
import { useAuthStore } from "../store/authStore";

export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

function getAuthHeaders() {
    const token = useAuthStore.getState().token;
    return token ? { Authorization: `Bearer ${token}` } : {};
}

// AUTH

export const register = async (data: RegisterRequest): Promise<User> => {
    await nextServer.post('/auth/register', data);
    return await login({email: data.email, password: data.password});
}

export const login = async (data: LoginRequest): Promise<User> => {
    console.log("Login payload:", data); 
    const loginRes = await nextServer.post('/auth/login', data);
      console.log("Login response:", loginRes.data);
    const accessToken = loginRes.data.data.accessToken;
    const { data: user } = await nextServer.get<User>('/users/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    useAuthStore.getState().setAuth(user, accessToken);
    return user;
}

export const logout = async (): Promise<void> => {
    await nextServer.post('/auth/logout', {}, { headers: getAuthHeaders() });
    useAuthStore.getState().clearAuth();
}

// USERS

export type UpdateUserRequest = {
    name?: string;
    email?: string;
    dueDate?: string;
    gender?: 'boy' | 'girl' | 'null';
    photoURL?: string;
}

export const getMe = async (): Promise<User> => {
    const { data } = await nextServer.get<User>('/users/me', {
        headers: getAuthHeaders(),
    });
    return data;
}

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
    const { data } = await nextServer.patch<User>('/users/me', payload, {
        headers: getAuthHeaders(),
    });
    const token = useAuthStore.getState().token;
    useAuthStore.getState().setAuth(data, token!);
    return data;
}

// WEEKS

export const getPublicWeekInfo = async () => {
    const { data } = await nextServer.get('/weeks/public');
    return data;
}

export const getPrivateWeekInfo = async () => {
    const { data } = await nextServer.get('/weeks/info', {
        headers: getAuthHeaders(),
    });
    return data;
}

export const getBabyDetails = async (week: number) => {
    const { data } = await nextServer.get(`/weeks/${week}/baby`, {
        headers: getAuthHeaders(),
    });
    return data;
}

export const getMomDetails = async (week: number) => {
    const { data } = await nextServer.get(`/weeks/${week}/mom`, {
        headers: getAuthHeaders(),
    });
    return data;
}
