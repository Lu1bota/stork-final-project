import TasksReminderCard from "@/components/dashboard/TasksReminderCard/TasksReminderCard";
import css from "./MomBlock.module.css";
import { MomDetails } from "@/types/weeks";

interface MomBlockProps {
  data: MomDetails;
}

export default function MomBBlock({ data }: MomBlockProps) {
  return (
    <div className={css.mom_container}>
      <div className={css.mom_tag_tip_container}>
        <div className={css.mom_card_feelings}>
          <h2 className={css.mom_cardTitle}>Як ви можете почуватись</h2>
          <div className={css.mom_tags_container}>
            {data.feelings.states.map((state, idx) => (
              <div key={idx} className={css.mom_tag}>
                {state}
              </div>
            ))}
          </div>
          <p className={css.mom_cardText}>{data.feelings.sensationDescr}</p>
        </div>

        {/* --- Поради для вашого комфорту --- */}
        <div className={css.mom_card}>
          <h2 className={css.mom_cardTitle}>Поради для вашого комфорту</h2>
          {data.comfortTips.map((tip, idx) => (
            <div key={idx} className={css.mom_tip}>
              <div className={css.mom_iconcontainer}>
                <svg
                  className={css.mom_icon}
                  aria-hidden="true"
                  width="24"
                  height="24"
                >
                  <use href={`/sprite.svg#${getIconByCategory(tip.category)}`} />
                </svg>
              </div>
              <div className={css.mom_tipContent}>
                <h3 className={css.mom_tipTitle}>{tip.category}</h3>
                <p className={css.mom_tipText}>{tip.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Важливі завдання --- */}
      <div>
        <TasksReminderCard />
      </div>
    </div>
  );
}

function getIconByCategory(category: string) {
    switch (category) {
        case "Харчування":
            return "fork_spoon";
        case "Активність":
            return "fitness_center";
        case "Відпочинок":
            return "chair";
        default:
            return "info";
    }
}