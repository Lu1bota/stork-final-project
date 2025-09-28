"use client"

import { DiaryEntryDetails } from "@/components/Diary/DiaryEntryDetails/DiaryEntryDetails";
import { DiaryEntry } from "@/types/diary";
import { useQueryClient } from "@tanstack/react-query";

type DiaryEntryPageClientProps = {
    entryId: string;
} 

export default function DiaryEntryPageClient({ entryId }: DiaryEntryPageClientProps) {
    const queryClient = useQueryClient();

    const entries = queryClient.getQueryData<DiaryEntry[]>(['diaryEntries']);
    const selectedCardDetails = entries?.find((entry) => entry._id === entryId);

    return <DiaryEntryDetails selectedCardDetails={selectedCardDetails} />;
}