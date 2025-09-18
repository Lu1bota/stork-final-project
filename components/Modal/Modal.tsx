"use client";

import { useEffect } from "react";
import css from "./Modal.module.css";


export type ModalProps = {
  children: React.ReactNode;
  title: string;
  close?: () => void;
};

export default function Modal({ children, title, close }: ModalProps) {
  // Закриття по клавіші Escape (проста реалізація)
  useEffect(() => {
    if (!close) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  return (
    // Бекдроп. Клік по ньому закриває модалку
    <div className={css.backdrop} onClick={close ? () => close() : undefined}>
      {/* Вміст модалки. Зупиняємо спливання кліку, щоб не закривати по кліку всередині */}
      <div className={css.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={css.header}>
          <h2 className={css.title}>{title}</h2>
          {close && (
            <button
              type="button"
              className={css.close}
              aria-label="Закрити"
              onClick={close}
            >
              ✕
            </button>
          )}
        </div>

        <div className={css.content}>{children}</div>
      </div>
    </div>
  );
}


