"use client"
import { DiaryEntry } from "@/types/diary";
import css from "./DiaryEntryDetails.module.css";
import { formattingDate } from "@/utils/dateUtils";
import { useState } from "react";
import { AddDiaryEntryModal } from "../AddDiaryEntryModal/AddDiaryEntryModal";


interface DiaryEntryDetailsProps {
    selectedCardDetails?: DiaryEntry | null,
    noEntryMessage?: string
}

export const DiaryEntryDetails = ({ selectedCardDetails, noEntryMessage }: DiaryEntryDetailsProps) => {

    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const handleOpenModalEdit = () => {
        setIsModalEditOpen(true);
    };

    const handleCloseModalEdit = () => {
        setIsModalEditOpen(false);
    };
    const handleOpenConfirmationModal = () => {
        setIsConfirmationModalOpen(true);
    };

    const handleCloseConfirmationModal = () => {
        setIsConfirmationModalOpen(false);
    };

    if (noEntryMessage || !selectedCardDetails) {
        return (
            <div className={css.diaryDetails}>
                <p className={css.diaryDetailsTitle}>Наразі записи у щоденнику відстні</p>
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
                    <button className={css.button} onClick={handleOpenConfirmationModal}>
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
                    title="Новий запис"
                />
            )}
            
            {/* ----- ДОРОБИТИ ConfirmationModal ----- */}
            {isConfirmationModalOpen && (
                <AddDiaryEntryModal onClose={handleCloseConfirmationModal} title="DELETE"/>
            )}
        </div>
}



// Відображає повну інформацію обраного запису. На мобілці/планшеті є окремою сторінкою.
// Компонент містить в собі:
// Заголовок запису.
// Дату створення.
// Повний текст запису.
// Список іконок-емоцій.
// Кнопки "Редагувати" та "Видалити".

// Взаємодія:
// Клік по кнопці "Редагувати" відкриває модальне вікно AddDiaryEntryModal з даними поточного запису для редагування.
// Клік по кнопці "Видалити" відкриває модальне вікно ConfirmationModal.