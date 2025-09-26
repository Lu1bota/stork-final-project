"use client";

import Container from "../../../components/Container/Container";
import GreetingBlock from "@/components/dashboard/GreetingBlock/GreetingBlock";
import WeekSelector from "../../../components/journey/WeekSelector/WeekSelector";
import JourneyDetails from "../../../components/journey/JourneyDetails/JourneyDetails";
import { useEffect, useState } from "react";
import { getPrivateWeekInfo } from "@/lib/api/clientApi";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import Loader from "@/components/Loader/Loader";
import { useParams, useRouter } from "next/navigation";

export default function JourneyPage() {
  const router = useRouter();
  const params = useParams<{ weekNumber: string }>();
  const selectedWeek = Number(params.weekNumber);

  const [maxAvailableWeek, setMaxAvailableWeek] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"baby" | "mom">(() =>
    (typeof window !== "undefined" &&
      (localStorage.getItem("activeTab") as "baby" | "mom")) ||
    "baby"
  );

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
  const fetchCurrentWeek = async () => {
    try {
      const weekInfo = await getPrivateWeekInfo();
      setMaxAvailableWeek(weekInfo.week);

      if (!params.weekNumber) {
        router.replace(`/journey/${weekInfo.week}`);
      }
    } catch {
      setError("Помилка завантаження поточного тижня");
    }
  };

  fetchCurrentWeek();
}, [params.weekNumber, router]);


  const handleWeekSelect = (week: number) => {
    router.push(`/journey/${week}`);
  };

  if (error) {
    return (
      <ErrorPage
        code={404}
        title="Помилка завантаження поточного тижня."
        message="Спробуйте ще раз."
        homeHref="/"
      />
    );
  }

  if (!maxAvailableWeek) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <GreetingBlock />
    
      <WeekSelector
        onWeekChange={handleWeekSelect}
        activeWeek={selectedWeek}
        maxAvailableWeek={maxAvailableWeek}
      />
    
        <JourneyDetails
          weekNumber={selectedWeek}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Container>
    </>
  );
}