"use client";

import React from "react";
import TasksReminderCard from "../components/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "../components/FeelingCheckCard/FeelingCheckCard";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function DashboardPage() {
  // Заглушки для открытия модального окна
  const openAddTaskModal = () => {
    console.log("Открыть модалку для добавления задачи");
  };

  const openAddDiaryModal = () => {
    console.log("Открыть модалку для добавления записи в дневник");
  };

  return (
    <div style={{ display: "flex", minHeight: "100dvh" }}>
      <Sidebar isAuthenticated={true} onLogout={() => console.log("logout")} />
      <main className={styles.container} style={{ flex: 1 }}>
        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            <TasksReminderCard onOpenAddTaskModal={openAddTaskModal} />
          </div>
          <div className={styles.rightColumn}>
            <FeelingCheckCard onOpenAddDiaryEntryModal={openAddDiaryModal} />
          </div>
        </div>
      </main>
    </div>
  );
}
