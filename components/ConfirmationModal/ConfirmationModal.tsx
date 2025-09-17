"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./ConfirmationModal.module.css";

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationModal({
  isOpen,
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Resolve portal target on mount (client-only)
    if (!portalTarget) {
      setPortalTarget(typeof document !== "undefined" ? document.getElementById("modal-root") : null);
    }
  }, [portalTarget]);

  useEffect(() => {
    if (!isOpen) return;
    lastActiveElementRef.current = (typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onCancel();
      }
      if (e.key === "Tab") {
        // Basic focus trap
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const focusables = Array.from(focusable).filter((el) => !el.hasAttribute("disabled"));
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = (typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null);
        if (e.shiftKey) {
          if (active === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (active === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };
    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeyDown, true);
      return () => document.removeEventListener("keydown", handleKeyDown, true);
    }
    return () => {};
  }, [isOpen, onCancel]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      const primaryButton = dialogRef.current?.querySelector<HTMLButtonElement>(
        `.${styles.primary}`
      );
      primaryButton?.focus();
    }, 0);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    return () => {
      lastActiveElementRef.current?.focus?.();
    };
  }, [isOpen]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onCancel();
    },
    [onCancel]
  );

  if (!isOpen || !portalTarget) return null;

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onMouseDown={handleBackdropClick}>
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        ref={dialogRef}
      >
        <h2 id="confirmation-modal-title" className={styles.title}>
          {title}
        </h2>

        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={onCancel}>
            {cancelButtonText}
          </button>
          <button type="button" className={styles.primary} onClick={onConfirm}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>,
    portalTarget
  );
}


