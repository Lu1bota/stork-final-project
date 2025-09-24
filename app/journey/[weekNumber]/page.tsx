"use client";
import { useRouter, useParams } from "next/navigation";
import WeekSelector from "@/components/WeekSelector/WeekSelector";
import { useEffect, useState } from "react";
import { getPrivateWeekInfo } from "@/lib/api/clientApi";
import JourneyDetails from "@/components/JourneyDetails/JourneyDetails";

export default function JourneyPage() {
  const router = useRouter();
  const params = useParams<{ weekNumber: string }>();
  const currentWeek = Number(params.weekNumber);

  const [maxAvailableWeek, setMaxAvailableWeek] = useState<number>();

  useEffect(() => {
    getPrivateWeekInfo().then((info) => setMaxAvailableWeek(info.week));
  }, []);

  const handleSelectWeek = (week: number) => {
    router.push(`/journey/${week}`);
  };

  return (
    <>
      <WeekSelector
        onSelect={handleSelectWeek}
        initialSelectedWeek={currentWeek}
        maxAvailableWeek={maxAvailableWeek}
      />
      <JourneyDetails week={currentWeek} />
    </>
  );
}
