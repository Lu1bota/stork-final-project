"use client"
import Link from "next/link";
import { DiaryEntryCard } from "../DiaryEntryCard/DiaryEntryCard"
import { useState } from "react";
import { DiaryEntryDetails } from "../DiaryEntryDetails/DiaryEntryDetails";
import css from "./DiaryList.module.css"
import { DiaryEntry } from "@/types/diary";
import { AddDiaryEntryModal } from "../AddDiaryEntryModal/AddDiaryEntryModal";

// export interface Emotion {
//     _id: string;
//     title: string;
// }

// export interface DiaryEntry {
//     _id: string;
//     title: string;
//     description: string;
//     date: string;
//     userId: string;
//     emotions: Emotion[];
//     createdAt: string;
//     updatedAt: string;
// }

type DiaryListProps = {
    isMobile: boolean,
    entries: DiaryEntry[]
};

export const DiaryList = ({ isMobile, entries }: DiaryListProps) => {
    // наявність записів
    const hasEntries = entries && entries.length > 0;
    // id першого запису (дефолтне значення)
    const initEntryId = hasEntries ? entries[0]._id : null;
    // id обраної картки
    const [selectedEntryId, setSelectedEntryId] = useState<string | null>(initEntryId);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCardClick = (entryId: string) => {
        if (!isMobile) {
            setSelectedEntryId(entryId);
        }
    };

    const selectedCardDetails = entries.find((entry) => entry._id === selectedEntryId);

    return (
        <>  
            <div className={css.list}>
                <div className={css.listHeaderContainer}>
                    <p>Ваші записи</p>
                    <button className={css.newEntryBtn} onClick={handleOpenModal}>
                        <p>Новий запис</p>
                        <svg width={24} height={24}>
                            <use href="/sprite.svg#add_circle"></use>
                        </svg>
                    </button>
                </div>
                {hasEntries && <ul>
                    {entries.map((entry) => (
                        <li key={entry._id} className={css.card}>
                            {isMobile ? (
                                <Link href={`/diary/${entry._id}`} className={css.linkWrapper}>
                                    <DiaryEntryCard entryCard={entry} />
                                </Link>
                            ) : (
                                <button className={css.button} onClick={() => handleCardClick(entry._id)}>
                                    <DiaryEntryCard entryCard={entry} />
                                </button>
                            )}
                        </li>
                    ))}
                </ul>}
            </div>
            
            {!isMobile && (
                hasEntries ? (
                    <DiaryEntryDetails selectedCardDetails={selectedCardDetails} />
                ) : (
                    <DiaryEntryDetails noEntryMessage="Наразі записи у щоденнику відсутні" />
                )
            )}

            {isModalOpen && (
                <AddDiaryEntryModal
                    onClose={handleCloseModal}
                    title="Новий запис"
                />
            )}
        </>
    );

}




  	
// Компонент відображає список записів щоденника.
// Дані зі списку приходять з бекенду.
// Компонент містить в собі:
// Заголовок сторінки ("Щоденник").
// Текст "Новий запис" з кнопкою, яка відкриває модальне вікно AddDiaryEntryModal.
// Список карток записів DiaryEntryCard.

// /api/diaries
// створити приватний ендпоінт для СТВОРЕННЯ запису в щоденник
// створити приватний ендпоінт для ОТРИМАННЯ записів щоденника
// створити приватний ендпоінт для РЕДАГУВАННЯ запису щоденника
// створити приватний ендпоінт для ВИДАЛЕННЯ запису зі щоденника