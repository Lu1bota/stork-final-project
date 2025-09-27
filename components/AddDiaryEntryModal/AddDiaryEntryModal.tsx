"use client";

import { useState } from "react";
import Modal from "../Modal/Modal";
import AddDiaryEntryForm from "./AddDiaryEntryForm";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

interface AddDiaryEntryModalProps {
  isEdit?: boolean;
  initialValues?: { title: string; categories: string[]; entry: string };
  onClose: () => void;
  onSubmit: (values: {
    title: string;
    categories: string[];
    entry: string;
  }) => Promise<void>;
}

export default function AddDiaryEntryModal({
  isEdit = false,
  initialValues,
  onClose,
  onSubmit,
}: AddDiaryEntryModalProps) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  // Хрестик або бекдроп відкриває підтвердження
  const handleClose = () => setIsConfirmationModalOpen(true);

  // Підтвердження закриття
  const handleConfirmCancel = () => {
    setIsConfirmationModalOpen(false);
    onClose();
  };

  // Після успішного сабміту закриваємо модалку
  const handleSubmit = async (values: {
    title: string;
    categories: string[];
    entry: string;
  }) => {
    await onSubmit(values);
    onClose();
  };

  return (
    <>
      <Modal
        title={isEdit ? "Редагувати запис" : "Новий запис"}
        onClose={handleClose}
      >
        <AddDiaryEntryForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </Modal>

      {isConfirmationModalOpen && (
        <ConfirmationModal
          title="Ви точно хочете вийти?"
          confirmButtonText="Так"
          cancelButtonText="Ні"
          onConfirm={handleConfirmCancel}
          onCancel={() => setIsConfirmationModalOpen(false)}
        />
      )}
    </>
  );
}
