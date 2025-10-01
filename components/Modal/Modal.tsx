"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import clsx from "clsx";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
  className?: string;
  modalType?: string;
}

export default function Modal({
  children,
  title,
  onClose,
  className,
  modalType,
}: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  function startClosing() {
    setIsClosing(true);
  }

  function handleAnimationEnd() {
    if (isClosing) {
      onClose();
    }
  }

  function handleBackdrop(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      startClosing();
    }
  }

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        startClosing();
      }
    }
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdrop}
    >
      <div
        className={clsx(css.modal, className, {
          [css.open]: !isClosing,
          [css.close]: isClosing,
        })}
        onAnimationEnd={handleAnimationEnd}
      >
        <h2
          id="modal-title"
          className={clsx(css.title, modalType && css[modalType])}
        >
          {title}
        </h2>
        <button
          type="button"
          className={css.closeBtn}
          aria-label="Закрити"
          onClick={startClosing}
        >
          <svg className={css.closeIcon} width="32" height="32" aria-hidden>
            <use href="/sprite.svg#close" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
