"use client";

import css from "./StatusBlock.module.css";

interface StatusBlockProps {
  week: string;
  day: string;
}

export default function StatusBlock({
  week = "1",
  day = "280",
}: StatusBlockProps) {
  return (
    <div className={css.containerStatus}>
      <div className={css.containerText}>
        <p className={css.textTitle}>Тиждень</p>
        <p className={css.textNumber}>{week}</p>
      </div>
      <div className={css.containerText}>
        <p className={css.textTitle}>Днів до зустрічі</p>
        <p className={css.textNumber}>~{day}</p>
      </div>
    </div>
  );
}
