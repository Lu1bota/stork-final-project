"use client";

import React from "react";
import TasksReminderCard from "../components/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "../components/FeelingCheckCard/FeelingCheckCard";
import styles from "./page.module.css";

export default function DashboardPage() {
  // Заглушки для открытия модального окна
  const openAddTaskModal = () => {
    console.log("Открыть модалку для добавления задачи");
  };

  const openAddDiaryModal = () => {
    console.log("Открыть модалку для добавления записи в дневник");
  };

  return (
    <main className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <TasksReminderCard onOpenAddTaskModal={openAddTaskModal} />
        </div>
        <div className={styles.rightColumn}>
          <FeelingCheckCard onOpenAddDiaryEntryModal={openAddDiaryModal} />
        </div>
      </div>
    </main>
  );
}