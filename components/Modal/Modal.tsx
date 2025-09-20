"use client";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import css from "./Modal.module.css";


export type ModalProps = {
  children: React.ReactNode;
  title: string;
  close: () => void;
};

export default function Modal({ children, title, close }: ModalProps) {
  // Закриття по клавіші Escape (проста реалізація)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  // Портал у document.body
  const [portalEl, setPortalEl] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = document.createElement("div");
    el.setAttribute("data-modal-portal", "");
    document.body.appendChild(el);
    setPortalEl(el);
    return () => {
      document.body.removeChild(el);
      setPortalEl(null);
    };
  }, []);

  if (!portalEl) return null;

  return ReactDOM.createPortal(
    <div className={css.backdrop} onClick={close}>
      <div
        className={css.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={css.header}>
          <h2 id="modal-title" className={css.title}>{title}</h2>
          <button
            type="button"
            className={css.close}
            aria-label="Закрити"
            onClick={close}
          >
            <svg className={css.closeIcon} width="24" height="24" aria-hidden>
              <use href="/sprite.svg#close" />
            </svg>
          </button>
        </div>
        <div className={css.content}>{children}</div>
      </div>
    </div>,
    portalEl
  );
}


