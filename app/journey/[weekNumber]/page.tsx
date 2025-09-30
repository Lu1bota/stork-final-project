import AppLayout from "@/components/AppLayout/AppLayout";
import WeekSelector from "@/components/journey/WeekSelector/WeekSelector";
import JourneyDetails from "@/components/journey/JourneyDetails/JourneyDetails";
import css from "./page.module.css";

type Props = {
  params: { weekNumber: string };
};

export default async function JourneyPage({ params }: Props) {
   const { weekNumber } = await params;
  const selectedWeek = Number(weekNumber);

  return (
    
    <AppLayout>
      <div className={css.journeyContainer}>
        <WeekSelector activeWeek={selectedWeek} />
        <JourneyDetails weekNumber={selectedWeek} />
      </div>
    </AppLayout>
  );
}
