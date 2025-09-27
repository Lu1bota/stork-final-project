"use client";

import css from "./GreetingBlock.module.css";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export default function GreetingBlock() {
  const [userName, setUserName] = useState<string | undefined>("майбутня мама");
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && user?.name) {
      setUserName(user?.name);
    }
  }, [isAuthenticated, user?.name]);

  return <h1 className={css.title}>Доброго ранку, {userName}!</h1>;
}
