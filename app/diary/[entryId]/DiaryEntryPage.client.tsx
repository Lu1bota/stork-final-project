"use client"

import { DiaryEntryDetails } from "@/components/Diary/DiaryEntryDetails/DiaryEntryDetails";
import { getDiaryEntries } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";

type DiaryEntryPageClientProps = {
    entryId: string;
} 

export default function DiaryEntryPageClient({ entryId }: DiaryEntryPageClientProps) {

    const { data: entries } = useQuery({
        queryKey: ['diaryEntries'],
        queryFn: () => getDiaryEntries(), 
    });

    const selectedCardDetails = entries?.find((entry) => entry._id === entryId);

    if (!selectedCardDetails) {
        return <DiaryEntryDetails noEntryMessage="Наразі записи у щоденнику відсутні" />;
    }

    return <DiaryEntryDetails selectedCardDetails={selectedCardDetails} />;

}