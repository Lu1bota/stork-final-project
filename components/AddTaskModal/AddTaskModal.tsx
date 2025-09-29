"use client";

import Modal from "../Modal/Modal";
import AddTaskForm from "./AddTaskForm";

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
  const handleSubmit = async (values: { title: string; date: Date }) => {
    await onSubmit(values);
    onClose();
  };

  return (
    <Modal
      title={isEdit ? "Редагувати завдання" : "Нове завдання"}
      onClose={onClose}
    >
      <AddTaskForm initialValues={initialValues} onSubmit={handleSubmit} />
    </Modal>
  );
}
