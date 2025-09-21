export interface Emotion {
    _id: string;
    title: string;
}

export interface DiaryEntry {
    _id: string;
    title: string;
    description: string;
    date: string;
    userId: string;
    emotions: Emotion[];
    createdAt: string;
    updatedAt: string;
}