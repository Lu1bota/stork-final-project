"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./MomTipCard.module.css";
import { getPrivateWeekInfo, getPublicWeekInfo } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Loader from "@/components/Loader/Loader";
import ErrorView from "@/components/ErrorPage/ErrorPage";

// interface MomTipCardProps {
//   tip: string;
// }

export default function MomTipCard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["momTip"],
    queryFn: isAuthenticated ? getPrivateWeekInfo : getPublicWeekInfo,
  });

  return (
    <>
      {isLoading && <Loader />}
      {isError && data && <ErrorView />}

      <div className={css.containerTip}>
        <h3 className={css.titleTip}>Порада для мами</h3>
        <p className={css.textTip}>
          {data?.momTip || "Зосередьтеся на здоровому харчуванні"}
        </p>
      </div>
    </>
  );
}
