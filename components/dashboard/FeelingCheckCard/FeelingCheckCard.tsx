"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import styles from "./FeelingCheckCard.module.css";
import { AddDiaryEntryModal } from "@/components/Diary/AddDiaryEntryModal/AddDiaryEntryModal";

type Props = {
  // onOpenAddDiaryEntryModal?: () => void;
  className?: string;
};

export default function FeelingCheckCard({ className = "" }: Props) {
  const [diaryEntryModal, setDiaryEntryModal] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const openModal = () => setDiaryEntryModal(true);
  const closeModal = () => setDiaryEntryModal(false);

  const handleMakeEntry = () => {
    if (!isAuthenticated) {
      router.push("/auth/register");
      return;
    }
    openModal();
  };

  return (
    <section className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Як ви себе почуваєте?</h3>
      </div>

      <div className={styles.content}>
        <p className={styles.recommendation}>
          <span>Рекомендація на сьогодні:</span>
          <br /> Занотуйте незвичні відчуття у тілі.
        </p>

        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={handleMakeEntry}>
            Зробити запис у щоденник
          </button>
        </div>
      </div>

      {diaryEntryModal && <AddDiaryEntryModal onClose={closeModal} />}
    </section>
  );
}
