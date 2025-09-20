import { nextServer } from "./api";
import { User } from "@/types/user";
import { useAuthStore } from "../store/authStore";
import { CreateTaskRequest, Task } from "@/types/task.js";
import { DiaryEntry, Emotion } from "@/types/diary.js";

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

// TASKS

export const getTasks = async (): Promise<Task[]> => {
    const { data } = await nextServer.get<{ status: number; message: string; data: Task[]}>('/tasks', {
        headers: getAuthHeaders(),
    });
    return data.data;
}

export const createTask = async (payload: CreateTaskRequest): Promise<Task> => {
    const { data } = await nextServer.post<{ status: number; message: string; data: Task }>('/tasks', payload, {
        headers: getAuthHeaders(),
    });
    return data.data;
}

export const setTaskCompleted = async (taskId: string, completed: boolean): Promise<Task> => {
    const { data } = await nextServer.patch<{ status: number; message: string; data: Task }>(`/tasks/${taskId}/complited`,
        { completed },
        { headers: getAuthHeaders() }
    );
    return data.data;
}

// DIARIES

export const getDiaryEntries = async (): Promise<DiaryEntry[]> => {
    const { data } = await nextServer.get<{ status: number; message: string; data: DiaryEntry[]}>('/diaries', {
        headers: getAuthHeaders(),
    });
    return data.data;
}

export type CreateDiaryRequest = {
  title: string;
  description: string;
  date?: string;
  emotions: string[];
}

export const createDiaryEntry = async (payload: CreateDiaryRequest): Promise<DiaryEntry> => {
    const { data } = await nextServer.post<{ status: number; message: string; data: DiaryEntry }>('/diaries', payload, {
        headers: getAuthHeaders(),
    });
    return data.data;
}
    
export type UpdateDiaryRequest = {
    title?: string;
    description?: string;
    date?: string;
    emotions?: string[];
}

export const updateDiaryEntry = async (entryId: string, payload: UpdateDiaryRequest): Promise<DiaryEntry> => {
    const { data } = await nextServer.patch<{ status: number; message: string; data: DiaryEntry }>(`/diaries/${entryId}`, payload, {
        headers: getAuthHeaders(),
    });
    return data.data;
}

export const deleteDiaryEntry = async (entryId: string): Promise<void> => {
    await nextServer.delete(`/diaries/${entryId}`, {
        headers: getAuthHeaders(),
    });
}

export const getEmotions = async (): Promise<Emotion[]> => {
    const { data } = await nextServer.get<{ status: number; message: string; data: Emotion[] }>('/emotions', {
        headers: getAuthHeaders(),
    });
    return data.data;
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
