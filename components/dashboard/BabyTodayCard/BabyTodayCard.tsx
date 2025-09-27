"use client";

import React from "react";
import Image from "next/image";
import { useBabyDetails } from "@/hooks/useBabyDetails";
// import { useAuthStore } from "@/lib/store/authStore";
import type { BabyDetails } from "@/types/weeks";
import css from "./BabyTodayCard.module.css";

export default function BabyTodayCard() {
  const { data, isLoading, error, refetch } = useBabyDetails();
  // const { isAuthenticated } = useAuthStore();

  const babyData = data as BabyDetails | undefined;

  if (isLoading) {
    return (
      <section className={css.card} aria-label="Baby development today">
        <div className={css.loadingContainer}>
          <div className={css.spinner}></div>
          <p>Завантаження даних про малюка...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={css.card} aria-label="Baby development today">
        <div className={css.errorContainer}>
          <h2 className={css.header}>Малюк сьогодні</h2>
          <div className={css.errorMessage}>
            <p>Помилка завантаження даних</p>
            <p className={css.errorDetails}>{error.message}</p>
            <button
              onClick={() => refetch()}
              className={css.retryButton}
              type="button"
            >
              Спробувати знову
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!babyData) {
    return (
      <section className={css.card} aria-label="Baby development today">
        <div className={css.errorContainer}>
          <h2 className={css.header}>Малюк сьогодні</h2>
          <p>Дані про малюка недоступні</p>
          <button
            onClick={() => refetch()}
            className={css.retryButton}
            type="button"
          >
            Завантажити дані
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={css.card} aria-label="Baby development today">
      <div className={css.headerContainer}>
        <h2 className={css.header}>Малюк сьогодні</h2>
      </div>

      <div className={css.content}>
        <div className={css.imageWrapper}>
          <Image
            src={babyData.image}
            alt="Baby development illustration"
            width={287}
            height={217}
            className={css.image}
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://ftp.goit.study/img/lehlehka/6895ce04a5c677999ed2af25.webp";
            }}
          />
        </div>

        <div className={css.details}>
          <div className={css.detailItem}>
            <strong className={css.detailLabel}>Розмір: </strong>
            <span className={css.detailValue}>{babyData.size}</span>
          </div>
          <div className={css.detailItem}>
            <strong className={css.detailLabel}>Вага: </strong>
            <span className={css.detailValue}>{babyData.weight}</span>
          </div>
          <div className={css.detailItem}>
            <strong className={css.detailLabel}>Активність: </strong>
            <span className={css.detailValue}>{babyData.activity}</span>
          </div>
        </div>
      </div>

      <div className={css.developmentSection}>
        <p className={css.developmentText}>{babyData.development}</p>
      </div>
    </section>
  );
}
