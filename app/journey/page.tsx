"use client";
import Container from "../../components/Container/Container";
import Greating from "../../components/GreatingBlock/GreetingBlock";
import WeekSelector from "../../components/journey/WeekSelector/WeekSelector";
import JourneyDetails from "../../components/journey/JourneyDetails/JourneyDetails";
import { useEffect, useState } from "react";
import { getBabyDetails, getPrivateWeekInfo } from "@/lib/api/clientApi";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import Loader from "@/components/Loader/Loader";

export default function JourneyPage() {
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [error, setError] = useState<null | string>(null);

  // Функція для завантаження тижня користувача (поточний тиждень)
  useEffect(() => {
    async function fetchCurrentWeek() {
      try {
        const weekInfo = await getPrivateWeekInfo();
        setCurrentWeek(weekInfo.week);
        setSelectedWeek(weekInfo.week);
      } catch {
        setError("Помилка завантаження поточного тижня");
      }
    }
    fetchCurrentWeek();
  }, []);

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

  const fetchWeekInfo = async (week: number) => {
    const babyDetails = await getBabyDetails(week);
    return babyDetails;
  };

  if (currentWeek === null || selectedWeek === null) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <Greating />
      </Container>
      <WeekSelector
        currentWeek={currentWeek}
        totalWeeks={42}
        onWeekChange={setSelectedWeek}
      />
      <Container>
        <JourneyDetails
          weekNumber={selectedWeek}
          fetchWeekInfo={fetchWeekInfo}
        />
      </Container>
    </>
  );
}
