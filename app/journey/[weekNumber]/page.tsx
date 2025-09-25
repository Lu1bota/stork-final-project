'use client';

import { useParams, useRouter } from "next/navigation";
import WeekSelector from "@/components/journey/WeekSelector/WeekSelector";
import { useEffect, useState } from "react";
import { getPrivateWeekInfo } from "@/lib/api/clientApi";
import JourneyDetails from "@/components/journey/JourneyDetails/JourneyDetails";
import Container from "@/components/Container/Container";
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";

export default function JourneyPage() {
  const router = useRouter();
  const params = useParams<{ weekNumber: string }>();
  const currentWeek = Number(params.weekNumber);

  const [maxAvailableWeek, setMaxAvailableWeek] = useState<number>();

  useEffect(() => {
    getPrivateWeekInfo().then(info => setMaxAvailableWeek(info.week));
  }, []);

  const handleSelectWeek = (week: number) => {
    router.push(`/journey/${week}`);
  }

  return (
    <Container>
      <GreetingBlock/>
      <WeekSelector onSelect={handleSelectWeek} initialSelectedWeek={currentWeek} maxAvailableWeek={maxAvailableWeek} />
      <JourneyDetails week={currentWeek}/>
    </Container>
  );
}
