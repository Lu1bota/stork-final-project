export interface User {
    _id: string;
    name: string;
    email: string;
    gender: 'boy' | 'girl' | 'null';
    dueDate?: string;
    photoUrl?: string;
    photoURL?: string;
    createdAt?: string;
    updatedAt?: string;
}