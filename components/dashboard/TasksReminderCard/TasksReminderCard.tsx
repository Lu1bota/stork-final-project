"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { getTasks, createTask, setTaskCompleted } from "@/lib/api/clientApi";
import { Task } from "@/types/task";
import AddTaskModal from "@/components/AddTaskModal/AddTaskModal";
import Loader from "@/components/Loader/Loader";
import ErrorView from "@/components/ErrorPage/ErrorPage";
import styles from "./TasksReminderCard.module.css";
import toast from "react-hot-toast";

type Props = {
  initialTasks?: Task[];
  onOpenAddTaskModal?: () => void;
  className?: string;
};

const isToday = (date?: string | null) => {
  if (!date) return false;
  const d = new Date(date);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

const formatDate = (date?: string | null) => {
  if (!date) return "";
  try {
    const d = new Date(date);
    return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
  } catch {
    return "";
  }
};

export default function TasksReminderCard({
  initialTasks = [],
  onOpenAddTaskModal,
  className = "",
}: Props) {
  const router = useRouter();
  const { isAuthenticated, token } = useAuthStore();

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    const loadTasks = async () => {
      if (!isAuthenticated || !token) {
        setIsLoadingList(false);
        return;
      }

      setIsLoadingList(true);
      setIsError(false);

      try {
        const data = await getTasks();
        if (mounted) {
          setTasks(data);
        }
      } catch (err) {
        console.error("Error loading tasks:", err);
        if (mounted) setIsError(true);
      } finally {
        if (mounted) setIsLoadingList(false);
      }
    };

    loadTasks();
    return () => {
      mounted = false;
    };
  }, [isAuthenticated, token]);

  const { todayTasks, upcomingTasks } = useMemo(() => {
    const sorted = [...tasks].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return {
      todayTasks: sorted.filter((t) => isToday(t.date)),
      upcomingTasks: sorted.filter((t) => !isToday(t.date)),
    };
  }, [tasks]);

  const handleCreateNewTask = async () => {
    if (!isAuthenticated) {
      router.push("/auth/register");
      return;
    }

    if (onOpenAddTaskModal) {
      onOpenAddTaskModal();
      return;
    }

    setIsModalOpen(true);
  };

  const handleModalSubmit = async (values: { title: string; date: Date }) => {
    try {
      const dateString = values.date.toISOString().slice(0, 10);
      const newTask = await createTask({
        title: values.title,
        date: dateString,
      });
      setTasks((prev) => [...prev, newTask]);
      toast.success("Завдання успішно створено!");
    } catch {
      toast.error("Помилка при створенні завдання!");
    }
  };

  const toggleTask = async (task: Task) => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === task._id ? { ...t, completed: !t.completed } : t
      )
    );

    try {
      const updatedTask = await setTaskCompleted(task._id, !task.completed);
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? updatedTask : t))
      );
    } catch (err) {
      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? { ...t, completed: task.completed } : t
        )
      );
      console.error("Toggle task error:", err);
    }
  };

  if (isLoadingList) return <Loader />;
  if (isError) return <ErrorView />;

  return (
    <>
      <section className={`${styles.card} ${className}`}>
        <div className={styles.header}>
          <h3 className={styles.title}>Важливі завдання</h3>
          <button
            className={styles.createBtn}
            onClick={handleCreateNewTask}
            aria-label="Create new task"
          >
            <svg
              className={styles.addIcon}
              aria-hidden="true"
              width="24"
              height="24"
            >
              <use href="/sprite.svg#add_circle" />
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {tasks.length === 0 ? (
            <div className={styles.emptyTask}>
              <span>Наразі немає жодних завдань</span> <br />
              Створіть мершій нове завдання!
            </div>
          ) : (
            <div className={styles.listWrapper}>
              {todayTasks.length > 0 && (
                <div className={styles.group}>
                  <h4 className={styles.groupTitle}>Сьогодні:</h4>
                  {todayTasks.map((task) => (
                    <label key={task._id} className={styles.taskRow}>
                      <div
                        className={`${styles.checkbox} ${
                          task.completed ? styles.checked : ""
                        }`}
                        onClick={() => toggleTask(task)}
                        role="checkbox"
                        aria-checked={task.completed}
                      >
                        {task.completed && (
                          <svg
                            className={styles.checkIcon}
                            aria-hidden="true"
                            width="14"
                            height="12"
                          >
                            <use href="/sprite.svg#flag" />
                          </svg>
                        )}
                      </div>

                      <div className={styles.taskContent}>
                        <span className={styles.date}>
                          {formatDate(task.date)}
                        </span>
                        <span
                          className={
                            task.completed
                              ? styles.completedTitle
                              : styles.taskTitle
                          }
                        >
                          {task.title}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {upcomingTasks.length > 0 && (
                <div className={styles.group}>
                  <h4 className={styles.groupTitle}>
                    Завдання на найближчий тиждень:
                  </h4>
                  {upcomingTasks.map((task) => (
                    <label key={task._id} className={styles.taskRow}>
                      <div
                        className={`${styles.checkbox} ${
                          task.completed ? styles.checked : ""
                        }`}
                        onClick={() => toggleTask(task)}
                        role="checkbox"
                        aria-checked={task.completed}
                      >
                        {task.completed && (
                          <svg className={styles.checkIcon} aria-hidden="true">
                            <use href="/sprite.svg#flag" />
                          </svg>
                        )}
                      </div>

                      <div className={styles.taskContent}>
                        <span className={styles.date}>
                          {formatDate(task.date)}
                        </span>
                        <span
                          className={
                            task.completed
                              ? styles.completedTitle
                              : styles.taskTitle
                          }
                        >
                          {task.title}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {tasks.length === 0 && (
          <button
            className={styles.bottomCreateBtn}
            onClick={handleCreateNewTask}
          >
            Створити завдання
          </button>
        )}
      </section>

      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </>
  );
}
