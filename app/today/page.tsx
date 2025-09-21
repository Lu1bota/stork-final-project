import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import StatusBlock from "@/components/StatusBlock/StatusBlock";
import BabyTodayCard from "@/components/BabyTodayCard/BabyTodayCard";
import MomTipCard from "@/components/MomTipCard/MomTipCard";
import TasksReminderCard from "@/components/TasksReminderCard/TasksReminderCard";
import FeelingCheckCard from "@/components/FeelingCheckCard/FeelingCheckCard";
import css from "./DashboardPage.module.css";

export default function DashboardPage() {
  return (
    <div className={css.dashboardContainer}>
      <GreetingBlock />
      <div className={css.dashboardMain}>
        <div className={css.leftColumn}>
          <div className={css.topCombined}>
            <StatusBlock />
            <BabyTodayCard />
          </div>
          <MomTipCard />
        </div>
        <div className={css.rightColumn}>
          <div className={css.tipFeelingBlocks}>
            <TasksReminderCard />
            <FeelingCheckCard />
          </div>
        </div>
      </div>
    </div>
  );
}
