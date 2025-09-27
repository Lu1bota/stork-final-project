"use client";
import { useEffect, useState } from "react";
import css from "./WeekSelector.module.css";
import { useRouter } from "next/navigation";

interface WeekSelectorProps {
  currentWeek: number; // поточний тиждень вагітності
  totalWeeks?: number; // загальна кількість тижнів
  onWeekChange: (week: number) => void; // колбек для оновлення JourneyDetails
}

export default function WeekSelector({
  currentWeek,
  totalWeeks = 42,
  onWeekChange,
}: WeekSelectorProps) {
  const router = useRouter();
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  useEffect(() => {
    setSelectedWeek(currentWeek);
  }, [currentWeek]);

  const handleWeekClick = (week: number) => {
    if (week > currentWeek) return;

    setSelectedWeek(week);
    onWeekChange(week);
    router.push(`journey/${week}`);
  };

  return (
    <div className={css.weeks_wrapper}>
      <ul className={css.weeks_list}>
        {Array.from({ length: totalWeeks }, (_, i) => {
          const week = i + 1;
          const isActive = week === selectedWeek;
          const isDisabled = week > currentWeek;
          return (
            <li key={week} className={css.weeks_list_item}>
              <button
                disabled={isDisabled}
                className={`${css.item_button} ${isActive ? css.active_butt : ""}  ${isDisabled ? css.disabled_butt : ""}`}
                onClick={() => handleWeekClick(week)}
              >
                <span className={css.item_title_number}>{week}</span>
                <p className={css.item_title}>Тиждень</p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
