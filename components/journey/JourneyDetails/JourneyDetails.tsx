"use client";
import { useState, useEffect } from "react";

import Tab from "../../journey/Tab/Tab";
import BabyBlock from "../BabyBlock/BabyBlock";
import { BabyDetails } from "@/types/weeks";
import Loader from "@/components/Loader/Loader";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
// import MomBlock from "../MomBlock/MomBlock"

interface JourneyDetailsProps {
  weekNumber: number; // Вибраний тиждень вагітності
  fetchWeekInfo: (week: number) => Promise<BabyDetails>; // Функція завантаження даних
}

export default function JourneyDetails({
  weekNumber,
  fetchWeekInfo,
}: JourneyDetailsProps) {
  const [activeTab, setActiveTab] = useState<"Малюк" | "Мама">("Малюк");
  const [babyInfo, setBabyInfo] = useState<BabyDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      setBabyInfo(null);
      try {
        const data = await fetchWeekInfo(weekNumber);
        setBabyInfo(data);
      } catch {
        setError("Дані на цей тиждень не завантажено.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [fetchWeekInfo, weekNumber]);

  if (loading) return <Loader />;
  if (error)
    return (
      <ErrorPage
        code={404}
        title="Помилка завантаження даних."
        message={error}
        homeHref="/"
      />
    );
  if (!babyInfo) return null;

  return (
    <>
      <Tab activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "Малюк" && <BabyBlock baby={babyInfo} />}
      {/* {activeTab === "Мама" && <MomBlock momTip={weekInfo.momTip} />} */}
    </>
  );
}
