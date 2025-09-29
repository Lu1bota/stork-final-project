// "use client";

// import WeekSelector from "../../../components/journey/WeekSelector/WeekSelector";
// import JourneyDetails from "../../../components/journey/JourneyDetails/JourneyDetails";
// import { useEffect, useState } from "react";
// import { getPrivateWeekInfo } from "@/lib/api/clientApi";
// import ErrorPage from "@/components/ErrorPage/ErrorPage";
// import Loader from "@/components/Loader/Loader";
// import { useParams, useRouter } from "next/navigation";
// import AppLayout from "@/components/AppLayout/AppLayout";
// import css from "./page.module.css"

// export default function JourneyPage() {
//   const router = useRouter();
//   const params = useParams<{ weekNumber: string }>();
//   const selectedWeek = Number(params.weekNumber);

//   const [maxAvailableWeek, setMaxAvailableWeek] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//   const fetchCurrentWeek = async () => {
//     try {
//       const weekInfo = await getPrivateWeekInfo();
//       setMaxAvailableWeek(weekInfo.week);

//       if (!params.weekNumber) {
//         router.replace(`/journey/${weekInfo.week}`);
//       }
//     } catch {
//       setError("Помилка завантаження поточного тижня");
//     }
//   };

//   fetchCurrentWeek();
// }, [params.weekNumber, router]);

//   const handleWeekSelect = (week: number) => {
//     router.push(`/journey/${week}`);
//   };

//   if (error) {
//     return (
//       <ErrorPage
//         code={404}
//         title="Помилка завантаження поточного тижня."
//         message="Спробуйте ще раз."
//         homeHref="/"
//       />
//     );
//   }

//   if (!maxAvailableWeek) {
//     return <Loader />;
//   }

//   return (
//     <>
//       <AppLayout>
//         <div className={css.journeyContainer}>
//       <WeekSelector
//         onWeekChange={handleWeekSelect}
//         activeWeek={selectedWeek}
//         maxAvailableWeek={maxAvailableWeek}
//       />
//         <JourneyDetails
//           weekNumber={selectedWeek}
//           />
//           </div>
//       </AppLayout>
//     </>
//   );
// }


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
