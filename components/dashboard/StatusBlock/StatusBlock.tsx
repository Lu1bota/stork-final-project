"use client";

import css from "./StatusBlock.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getPrivateWeekInfo, getPublicWeekInfo } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";
import ErrorView from "@/components/ErrorPage/ErrorPage";

export default function StatusBlock() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const {
    data: weekData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["week"],
    queryFn: isAuthenticated ? getPrivateWeekInfo : getPublicWeekInfo,
  });

  return (
    <>
      {isLoading && <Loader />}
      {isError && !weekData && <ErrorView />}

      {weekData && (
        <div className={css.containerStatus}>
          <div className={css.containerText}>
            <p className={css.textTitle}>Тиждень</p>
            <p className={css.textNumber}>{weekData?.week}</p>
          </div>
          <div className={css.containerText}>
            <p className={css.textTitle}>Днів до зустрічі</p>
            <p className={css.textNumber}>~{weekData?.daysUntilDue}</p>
          </div>
        </div>
      )}
    </>
  );
}
