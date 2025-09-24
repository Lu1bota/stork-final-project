"use client";

import { useEffect, useState } from "react";
import { getBabyDetails, getMomDetails } from "@/lib/api/clientApi";
import { BabyDetails, MomDetails } from "@/types/weeks";
import Loader from "../Loader/Loader";
import css from "./JourneyDetails.module.css";
import BabyTab from "../BabyTab/BabyTab";

interface JourneyDetailsProps {
  week: number;
}

export default function JourneyDetails({ week }: JourneyDetailsProps) {
  const [activeTab, setActiveTab] = useState<"baby" | "mom">("baby");
  const [baby, setBaby] = useState<BabyDetails | null>(null);
  const [mom, setMom] = useState<MomDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const babyData = await getBabyDetails(week);
        setBaby(babyData);
        const momData = await getMomDetails(week);
        setMom(momData);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [week]);

  if (loading) return <Loader />;

  return (
    <div className={css.wrapper}>
      <div className={css.switcher}>
        <button
          className={`${css.switch_button} ${activeTab === "baby" ? css.active : ""}`}
          onClick={() => setActiveTab("baby")}
        >
          Розвиток малюка
        </button>
        <button
          className={`${css.switch_button} ${activeTab === "mom" ? css.active : ""}`}
          onClick={() => setActiveTab("mom")}
        >
          Тіло мами
        </button>
      </div>
      <div className={css.content}>
        {activeTab === "baby" && baby && <BabyTab data={baby} />}
        {/* {activeTab === "mom" && mom && <MomTab data={mom} />} */}
      </div>
    </div>
  );
}
