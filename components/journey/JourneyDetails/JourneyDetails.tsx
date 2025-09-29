"use client";
import { useState, useEffect } from "react";
import Tab from "../../journey/Tab/Tab";
import BabyBlock from "../BabyBlock/BabyBlock";
import { BabyDetails, MomDetails } from "@/types/weeks";
import Loader from "@/components/Loader/Loader";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import MomBlock from "../MomBlock/MomBlock"
import { getBabyDetails, getMomDetails } from "@/lib/api/clientApi";
import css from "./JourneyDetails.module.css"

interface JourneyDetailsProps {
  weekNumber: number;
}

export default function JourneyDetails({
  weekNumber,
}: JourneyDetailsProps) {

  const [babyInfo, setBabyInfo] = useState<BabyDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [momInfo, setMomInfo] = useState<MomDetails | null>(null);

  
    const [activeTab, setActiveTab] = useState<"baby" | "mom">(() =>
      (typeof window !== "undefined" &&
        (localStorage.getItem("activeTab") as "baby" | "mom")) ||
      "baby"
    );
  
    useEffect(() => {
      localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);

    useEffect(() => {
    async function fetchData() {
      try {
      setLoading(true);
      setError(null);
        const babyData = await getBabyDetails(weekNumber);
        setBabyInfo(babyData);
        const momData = await getMomDetails(weekNumber);
        setMomInfo(momData);
      } catch {
        setError("Дані на цей тиждень не завантажено.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [weekNumber]);

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

  return (
    <>
      <div className={css.tab_container}>
      <Tab activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === "baby" && babyInfo && <BabyBlock baby={babyInfo} />}
        {activeTab === "mom" && momInfo && <MomBlock data={momInfo} />}
      </div>
    </>
  );
}
