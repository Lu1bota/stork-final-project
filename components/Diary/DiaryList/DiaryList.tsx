"use client"
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";;
import { useEffect, useState } from "react";
import { getDiaryEntries } from "@/lib/api/clientApi";
import { DiaryEntryCard } from "../DiaryEntryCard/DiaryEntryCard"
import { DiaryEntryDetails } from "../DiaryEntryDetails/DiaryEntryDetails";
import { AddDiaryEntryModal } from "../AddDiaryEntryModal/AddDiaryEntryModal";
import css from "./DiaryList.module.css"


type DiaryListProps = {
    isMobile: boolean,
};

export const DiaryList = ({ isMobile }: DiaryListProps) => {
    
    const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: entries } = useQuery({
        queryKey: ['diaryEntries'], 
        queryFn: getDiaryEntries,
    });

    useEffect(() => {
        if (entries && entries.length > 0) {
            const isSelectedEntryStillExists = entries.some(entry => entry._id === selectedEntryId);

            if (!isSelectedEntryStillExists) {
                setSelectedEntryId(entries[0]._id);
            }
        } else {
            setSelectedEntryId(null);
        }
    }, [entries, selectedEntryId]);

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
    
    const hasEntries = entries && entries.length > 0;
    const selectedCardDetails = hasEntries ? entries.find((entry) => entry._id === selectedEntryId) : null;

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
                {hasEntries && <ul className={css.entriesList}>
                    {entries.map((entry) => (
                        <li key={entry._id} className={`${css.card} ${selectedEntryId === entry._id ? css.activeCard : ''}`}>
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