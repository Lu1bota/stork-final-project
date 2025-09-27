import AppLayout from "@/components/AppLayout/AppLayout";
import FeelingCheckCard from "@/components/dashboard/FeelingCheckCard/FeelingCheckCard";
import MomTipCard from "@/components/dashboard/MomTipCard/MomTipCard";
import StatusBlock from "@/components/dashboard/StatusBlock/StatusBlock";
import TasksReminderCard from "@/components/dashboard/TasksReminderCard/TasksReminderCard";
import { getPublicWeekInfo } from "@/lib/api/clientApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import css from "./page.module.css";
import BabyTodayCard from "@/components/dashboard/BabyTodayCard/BabyTodayCard";

export default async function DashboardPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["publicWeek"],
    queryFn: getPublicWeekInfo,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AppLayout>
        <div className={css.stats}>
          <StatusBlock />
          <div className={css.baby}>
            <BabyTodayCard />
            <MomTipCard />
          </div>
        </div>
        <div className={css.tasks}>
          <TasksReminderCard />
          <FeelingCheckCard />
        </div>
      </AppLayout>
    </HydrationBoundary>
  );
}
