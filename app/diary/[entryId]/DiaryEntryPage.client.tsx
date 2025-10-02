"use client"

import { DiaryEntryDetails } from "@/components/Diary/DiaryEntryDetails/DiaryEntryDetails";
import { getDiaryEntries } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useBreadcrumbsStore } from "@/lib/store/useBreadcrumbsStore";


type DiaryEntryPageClientProps = {
    entryId: string;
} 

export default function DiaryEntryPageClient({ entryId }: DiaryEntryPageClientProps) {
    const setEntryTitle = useBreadcrumbsStore((state) => state.setEntryTitle);

    const { data: entries } = useQuery({
        queryKey: ['diaryEntries'],
        queryFn: () => getDiaryEntries(), 
    });

    const selectedCardDetails = entries?.find((entry) => entry._id === entryId);

    useEffect(() => {
        if (selectedCardDetails) {
            setEntryTitle(selectedCardDetails.title);
        } else {
            setEntryTitle(undefined);
        }
        return () => setEntryTitle(undefined);
    }, [selectedCardDetails, setEntryTitle])

    if (!selectedCardDetails) {
        return <DiaryEntryDetails noEntryMessage="Наразі записи у щоденнику відсутні" />;
    }

    return <DiaryEntryDetails selectedCardDetails={selectedCardDetails} />;

}