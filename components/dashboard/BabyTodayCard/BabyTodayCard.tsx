"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getPrivateWeekInfo, getPublicWeekInfo } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import type { BabyDetails } from "@/types/weeks";
import css from "./BabyTodayCard.module.css";
import Loader from "@/components/Loader/Loader";
import ErrorView from "@/components/ErrorPage/ErrorPage";

export default function BabyTodayCard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["babyToday", isAuthenticated],
    queryFn: () =>
      isAuthenticated ? getPrivateWeekInfo() : getPublicWeekInfo(),
  });

  const babyData = data?.baby as BabyDetails | undefined;

  if (isLoading) return <Loader />;
  if (isError) return <ErrorView />;

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