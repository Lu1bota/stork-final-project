import { nextServer } from "./api";
import { User } from "@/types/user";
import { useAuthStore } from "../store/authStore";
import { CreateTaskRequest, Task } from "@/types/task.js";
import { DiaryEntry, Emotion } from "@/types/diary.js";
import { BabyDetails, MomDetails, WeekInfo } from "@/types/weeks.js";

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
    try {
        await nextServer.post('/auth/register', data);
        return await login({email: data.email, password: data.password});
    } catch (error) {
        throw error;
    }
}

export const login = async (data: LoginRequest): Promise<User> => {
    try {
        const loginRes = await nextServer.post('/auth/login', data);
        const accessToken = loginRes.data.data.accessToken;
        const { data: user } = await nextServer.get<User>('/users/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        useAuthStore.getState().setAuth(user, accessToken);
        return user;
    } catch (error) {
        throw error;
    }
}

export const logout = async (): Promise<void> => {
    try {
        await nextServer.post('/auth/logout', {}, { headers: getAuthHeaders() });
        useAuthStore.getState().clearAuth();
    } catch (error) {
        throw error;
    }
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
    try {
        const { data } = await nextServer.get<User>('/users/me', {
            headers: getAuthHeaders(),
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const updateMe = async (payload: UpdateUserRequest): Promise<User> => {
    try {
        const { data } = await nextServer.patch<User>('/users/me', payload, {
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'multipart/form-data'
            }
        });
        const token = useAuthStore.getState().token;
        useAuthStore.getState().setAuth(data, token!);
        return data;
    } catch (error) {
        throw error;
    }
}

// TASKS

export const getTasks = async (): Promise<Task[]> => {
    try {
        const { data } = await nextServer.get<{
            status: number;
            message: string;
            data: Task[]
        }>('/tasks', {
            headers: getAuthHeaders(),
        });
        return data.data;
    } catch (error) {
        throw error;
    }
}

export const createTask = async (payload: CreateTaskRequest): Promise<Task> => {
    try {
        const { data } = await nextServer.post<{
            status: number;
            message: string;
            data: Task
        }>('/tasks', payload, {
            headers: getAuthHeaders(),
        });
    return data.data;
    } catch (error) {
        throw error;
    }
}

export const setTaskCompleted = async (taskId: string, completed: boolean): Promise<Task> => {
    try {
        const { data } = await nextServer.patch<{
            status: number;
            message: string;
            data: Task
        }>(`/tasks/${taskId}/completed`, { completed }, {
            headers: getAuthHeaders()
        });
        return data.data;
    } catch (error) {
        throw error;
    }
}

// DIARIES

export const getDiaryEntries = async (): Promise<DiaryEntry[]> => {
    try {
        const { data } = await nextServer.get<{
            status: number;
            message: string;
            data: DiaryEntry[]
        }>('/diaries', {
            headers: getAuthHeaders(),
        });
        return data.data;
    } catch (error) {
        throw error;
    }
}

export type CreateDiaryRequest = {
  title: string;
  description: string;
  date?: string;
  emotions: string[];
}

export const createDiaryEntry = async (payload: CreateDiaryRequest): Promise<DiaryEntry> => {
    try {
        const { data } = await nextServer.post<{
            status: number;
            message: string;
            data: DiaryEntry
        }>('/diaries', payload, {
            headers: getAuthHeaders(),
        });
        return data.data;
    } catch (error) {
        throw error;
    }
}
    
export type UpdateDiaryRequest = {
    title?: string;
    description?: string;
    date?: string;
    emotions?: string[];
}

export const updateDiaryEntry = async (entryId: string, payload: UpdateDiaryRequest): Promise<DiaryEntry> => {
    try {
        const { data } = await nextServer.patch<{
            status: number;
            message: string;
            data: DiaryEntry
        }>(`/diaries/${entryId}`, payload, {
            headers: getAuthHeaders(),
        });
    return data.data;
    } catch (error) {
        throw error;
    }
}

export const deleteDiaryEntry = async (entryId: string): Promise<void> => {
    try {
        await nextServer.delete(`/diaries/${entryId}`, {
            headers: getAuthHeaders(),
        });
    } catch (error) {
        throw error;
    }
}

export const getEmotions = async (): Promise<Emotion[]> => {
    try {
        const { data } = await nextServer.get<{
            status: number;
            message: string;
            data: Emotion[]
        }>('/diaries/emotions', {
            headers: getAuthHeaders(),
        });
        return data.data;
    } catch (error) {
        throw error;
    }
}

// WEEKS

export const getPublicWeekInfo = async (): Promise<WeekInfo> => {
    try {
        const { data } = await nextServer.get<WeekInfo>('/weeks/public');
        return data;
    } catch (error) {
        throw error;
    }
}

export const getPrivateWeekInfo = async (): Promise<WeekInfo> => {
    try {
        const { data } = await nextServer.get<WeekInfo>('/weeks/info', {
            headers: getAuthHeaders(),
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const getBabyDetails = async (week: number): Promise<BabyDetails> => {
    try {
        const { data } = await nextServer.get<BabyDetails>(`/weeks/${week}/baby`, {
            headers: getAuthHeaders(),
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export const getMomDetails = async (week: number): Promise<MomDetails> => {
    try {
        const { data } = await nextServer.get<MomDetails>(`/weeks/${week}/mom`, {
            headers: getAuthHeaders(),
        });
        return data;
    } catch (error) {
        throw error;
    }
}