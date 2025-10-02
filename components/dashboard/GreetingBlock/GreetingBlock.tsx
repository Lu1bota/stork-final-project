"use client";

import css from "./GreetingBlock.module.css";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";

function getGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 6 && hour < 12) return "Доброго ранку";
  if (hour >= 12 && hour < 18) return "Доброго дня";
  if (hour >= 18 && hour < 24) return "Доброго вечора";
  return "Доброї ночі";
}

export default function GreetingBlock() {
  const [userName, setUserName] = useState<string | undefined>("мама");
  const { isAuthenticated, user } = useAuthStore();
  const [greeting] = useState(() => getGreeting());

  useEffect(() => {
    if (isAuthenticated && user?.name) {
      setUserName(user?.name);
    } else {
      setUserName("мама");
    }
  }, [isAuthenticated, user?.name]);

  return (
    <h1 className={css.title}>
      {greeting}, {userName}!
    </h1>
  );
}
