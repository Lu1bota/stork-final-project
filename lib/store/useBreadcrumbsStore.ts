import {create} from 'zustand';

interface BreadcrumbsState {
    entryTitle?: string;
    setEntryTitle: (title?: string) => void;
}

export const useBreadcrumbsStore = create<BreadcrumbsState>((set) => ({
    entryTitle: undefined,
    setEntryTitle: (title) => set(() => ({ entryTitle: title })),
}));