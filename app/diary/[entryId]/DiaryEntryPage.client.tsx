"use client"

import Container from "@/components/Container/Container";
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

    return (
        <Container>
        <p>Header</p>
        <p>Diary Header</p>
        <p>GreetingBlock</p>
        <DiaryEntryDetails selectedCardDetails={selectedCardDetails} />
        </Container>
    );
}