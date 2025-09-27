"use client";

import Modal from "../Modal/Modal";
import css from "./ConfirmationModal.module.css";

interface ConfirmationModalProps {
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Modal title={title} onClose={onCancel}>
      <div className={css.actions}>
        <button type="button" className={css.confirm} onClick={onConfirm}>
          {confirmButtonText}
        </button>
        <button type="button" className={css.cancel} onClick={onCancel}>
          {cancelButtonText}
        </button>
      </div>
    </Modal>
  );
}
