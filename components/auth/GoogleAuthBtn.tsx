"use client";
import React from "react";
import styles from "./GoogleAuthBtn.module.css";

type Props = {
  className?: string;
  label?: string;
};

// Фронтенд: редірект на бекенд-ендпоїнт Google OAuth
// Очікуваний ендпоїнт: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`
export default function GoogleAuthBtn({ className, label = "Зареєструватись через Google" }: Props) {
  const handleClick = () => {
    const base = process.env.NEXT_PUBLIC_API_URL;
    if (!base) {
      console.warn("NEXT_PUBLIC_API_URL не задано. Додайте ключ у .env.local");
      return;
    }
    window.location.href = `${base}/api/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className ? `${styles.btn} ${className}` : styles.btn}
    >
      <span className={styles.iconBox} aria-hidden>
        <svg className={styles.icon} viewBox="0 0 32 32" focusable="false" aria-hidden="true">
          <use href="/sprite.svg#google" />
        </svg>
      </span>
      {label}
    </button>
  );
}


