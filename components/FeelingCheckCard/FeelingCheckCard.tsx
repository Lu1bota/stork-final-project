"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import styles from "./FeelingCheckCard.module.css";

type Props = {
  onOpenAddDiaryEntryModal?: () => void;
  className?: string;
};

export default function FeelingCheckCard({
  onOpenAddDiaryEntryModal,
  className = "",
}: Props) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const handleMakeEntry = () => {
    if (!isAuthenticated) {
      router.push("/register");
      return;
    }

    if (onOpenAddDiaryEntryModal) {
      onOpenAddDiaryEntryModal();
    } else {
      console.info("Open AddDiaryEntryModal (not implemented)");
    }
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
    </section>
  );
}
