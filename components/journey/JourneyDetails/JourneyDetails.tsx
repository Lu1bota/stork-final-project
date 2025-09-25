'use client';

// import Tab from "../../journey/Tab/Tab";
import { useEffect, useState } from "react";
import { getBabyDetails, getMomDetails } from "@/lib/api/clientApi";
import { BabyDetails, MomDetails } from "@/types/weeks";
import Loader from "@/components/Loader/Loader";
import BabyBlock from "../BabyBlock/BabyBlock";
// import MomBlock from "../MomBlock/MomBlock"
import css from './JourneyDetails.module.css';

interface JourneyDetailsProps {
  week: number;
}

export default function JourneyDetails({ week }: JourneyDetailsProps) {
  const [activeTab, setActiveTab] = useState<'baby' | 'mom'>('baby')
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
    }
  }, [week]);

  if (loading) return <Loader/>

  return (
    <>
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
      <div>
        {activeTab === 'baby' && baby && <BabyBlock data={baby} />}
        {/* {activeTab === 'mom' && mom && <MomBlock data={mom} />} */}
      </div>
    </>
  );
}
