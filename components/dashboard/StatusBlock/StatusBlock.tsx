"use client";

import css from "./StatusBlock.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { getPrivateWeekInfo, getPublicWeekInfo } from "@/lib/api/clientApi";
import { useEffect, useState } from "react";
import { WeekInfo } from "@/types/weeks";

export default function StatusBlock() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [weekData, setWeekData] = useState<WeekInfo | null>(null);

  useEffect(() => {
    async function fetchWeekData() {
      let data;

      if (isAuthenticated) {
        data = await getPrivateWeekInfo();
        setWeekData(data);
      } else {
        data = await getPublicWeekInfo();
        setWeekData(data);
      }
    }

    fetchWeekData();
  }, [isAuthenticated]);

  return (
    <>
      {weekData && (
        <div className={css.containerStatus}>
          <div className={css.containerText}>
            <p className={css.textTitle}>Тиждень</p>
            <p className={css.textNumber}>{weekData.week}</p>
          </div>
          <div className={css.containerText}>
            <p className={css.textTitle}>Днів до зустрічі</p>
            <p className={css.textNumber}>~{weekData.daysUntilDue}</p>
          </div>
        </div>
      )}
    </>
  );
}
