"use client";

import { useEffect } from "react";
import styles from "./Modal.module.css";


export type ModalProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) {
  // Закриття по клавіші Escape (проста реалізація, без керування фокусом)
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Якщо модалка закрита — нічого не рендеримо
  if (!isOpen) return null;

  return (
    // Бекдроп. Клік по ньому закриває модалку
    <div className={styles.backdrop} onClick={onClose}>
      {/* Вміст модалки. Зупиняємо спливання кліку, щоб не закривати по кліку всередині */}
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Закрити"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}


