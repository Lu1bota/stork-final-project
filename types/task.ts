export interface Task {
    _id: string;
    title: string;
    date: string;
    userId: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export type CreateTaskRequest = {
    title: string;
    date: string;
    completed?: boolean;
}

export type UpdateTaskStatusRequest = {
    completed: boolean;
}