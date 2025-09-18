"use client";

import { useEffect } from "react";
import styles from "./Modal.module.css";

// Опис пропсів модального вікна:
// - isOpen: чи відкрита модалка
// - title: текст запитання в шапці модалки
// - confirmButtonText: текст кнопки підтвердження
// - cancelButtonText: текст кнопки скасування
// - onConfirm: викликається при натисканні кнопки підтвердження
// - onCancel: викликається при скасуванні або закритті модалки
type ModalProps = {
  isOpen: boolean;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function Modal({
  isOpen,
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: ModalProps) {
  // Закриття по клавіші Escape (проста реалізація, без керування фокусом)
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onCancel]);

  // Якщо модалка закрита — нічого не рендеримо
  if (!isOpen) return null;

  return (
    // Бекдроп. Клік по ньому закриває модалку
    <div className={styles.backdrop} onClick={onCancel}>
      {/* Вміст модалки. Зупиняємо спливання кліку, щоб не закривати по кліку всередині */}
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{title}</h2>
        
        {/* Кнопки дії: Скасувати / Підтвердити */}
        <div className={styles.actions}>
          {/* Клік — закриває модалку */}
          <button className={styles.cancel} onClick={onCancel}>
            {cancelButtonText}
          </button>
          {/* Клік — викликає дію підтвердження */}
          <button className={styles.confirm} onClick={onConfirm}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}


