"use client";

import { useState } from "react";
import Modal from "../Modal/Modal";
import AddTaskForm from "./AddTaskForm";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";

interface AddTaskModalProps {
  isEdit?: boolean;
  initialValues?: { title: string; date: Date };
  onClose: () => void;
  onSubmit: (values: { title: string; date: Date }) => Promise<void>;
}

export default function AddTaskModal({
  isEdit = false,
  initialValues,
  onClose,
  onSubmit,
}: AddTaskModalProps) {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleClose = () => setIsConfirmationModalOpen(true);

  const handleConfirmCancel = () => {
    setIsConfirmationModalOpen(false);
    onClose();
  };

  const handleSubmit = async (values: { title: string; date: Date }) => {
    await onSubmit(values);
    onClose();
  };

  return (
    <>
      <Modal
        title={isEdit ? "Редагувати завдання" : "Нове завдання"}
        onClose={handleClose}
      >
        <AddTaskForm initialValues={initialValues} onSubmit={handleSubmit} />
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
