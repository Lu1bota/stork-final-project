"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DiaryEntry } from "@/types/diary";
import { AddDiaryEntryModal } from "../AddDiaryEntryModal/AddDiaryEntryModal";
import { formattingDate } from "@/utils/dateUtils";
import { deleteDiaryEntry } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import css from "./DiaryEntryDetails.module.css";

interface DiaryEntryDetailsProps {
    selectedCardDetails?: DiaryEntry | null,
    noEntryMessage?: string
}

export const DiaryEntryDetails = ({ selectedCardDetails, noEntryMessage }: DiaryEntryDetailsProps) => {
    const router = useRouter();

    const queryClient = useQueryClient();
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const handleOpenModalEdit = () => {
        setIsModalEditOpen(true);
    };
    const handleCloseModalEdit = () => {
        setIsModalEditOpen(false);
    };
      
    const deleteMutation = useMutation({
        mutationFn: (entryId: string) => deleteDiaryEntry(entryId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['diaryEntries'] }); 
            toast.success("Запис успішно видалено.");
        },
        onError: () => {
            toast.error("Не вдалося видалити запис.");
        },
    });
    
    const handleDelete = () => {
        if (selectedCardDetails) {
            deleteMutation.mutate(selectedCardDetails._id);
            router.push("/diary");
        }
    };
        
    if (noEntryMessage || !selectedCardDetails) {
        return (
            <div className={css.diaryDetails}>
                <p className={css.diaryDetailsTitle}>Наразі записи у щоденнику відсутні</p>
            </div>
        )    
    }

    return <div className={css.diaryDetails}>
            <div className={css.diaryDetailsContainer}>
                <div className={css.diaryDetailsSvgContainer}>
                    <p className={css.diaryDetailsTitle}>{selectedCardDetails.title}</p>
                    <button className={css.button} onClick={handleOpenModalEdit}>
                        <svg width={24} height={24}>
                            <use href="/sprite.svg#edit_square"></use>
                        </svg>
                    </button>
                </div>
                <div className={css.diaryDetailsSvgContainer}>
                    <p className={css.diaryDetailsDate}>{formattingDate(selectedCardDetails.date)}</p>
                    <button className={css.button} onClick={handleDelete} disabled={deleteMutation.isPending}>
                        <svg width={24} height={24}>
                            <use href="/sprite.svg#delete_forever"></use>
                        </svg>
                    </button>
                </div>
            </div>
                       
            <p className={css.diaryDetailsMainText}>{selectedCardDetails.description}</p>
            
            <div className={css.emotionsContainer}>
                {selectedCardDetails.emotions.map((emotion) => (
                    <div key={emotion._id} className={css.emotionsItem}>{emotion.title}</div>
                ))}
            </div>
        
            {isModalEditOpen && (
                <AddDiaryEntryModal
                    onClose={handleCloseModalEdit}
                    title="Редагувати запис"
                    entryToEdit={selectedCardDetails}
                />
            )}
    </div>
}