// 'use client'
// import { useEffect, useState } from "react";
// import css from "./WeekSelector.module.css";
// import Loader from "../Loader/Loader";

// interface WeekSelectorProps {
//   totalWeeks?: number;
//   onSelect: (week: number) => void;
//   initialSelectedWeek?: number;
//   maxAvailableWeek?: number;
// }

// export default function WeekSelector({ totalWeeks = 42, onSelect, initialSelectedWeek, maxAvailableWeek }: WeekSelectorProps) {
//   const [selectedWeek, setSelectedWeek] = useState<number | null>(initialSelectedWeek ?? null);

//   useEffect(() => {
//     if (initialSelectedWeek !== undefined) {
//       setSelectedWeek(initialSelectedWeek);
//     }
//   }, [initialSelectedWeek]);

//   const handleClick = (week: number, isBlocked: boolean) => {
//     if (isBlocked) return;
//     setSelectedWeek(week);
//     onSelect(week);
//   }

//   if (selectedWeek === null) {
//     return <Loader />;
//   }

//   const limitWeek = maxAvailableWeek !== undefined && selectedWeek !== null
//   ? Math.max(maxAvailableWeek, selectedWeek)
//   : maxAvailableWeek ?? totalWeeks;;

//   return (
//     <div className={css.weeks_wrapper}>
//       <ul className={css.weeks_list}>
//         {Array.from({ length: totalWeeks }, (_, i) => {
//           const week = i + 1;
//           const isBlocked = week > limitWeek;
//           const isActive = week === selectedWeek;

//           const liClass = `
//             ${css.weeks_list_item}
//             ${isBlocked ? css.week_blocked : isActive ? css.week_active : css.week_available}
//           `.trim();

//           return (
//             <li
//               key={week}
//               className={liClass}
//               onClick={() => handleClick(week, isBlocked)}
//             >

//               <div className={css.item_title_number}>{week}</div>
//               <p className={css.item_title}>Тиждень</p>
//             </li>
//           )

//         })}
//       </ul>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import css from "./WeekSelector.module.css";
import Loader from "../Loader/Loader";

interface WeekSelectorProps {
  totalWeeks?: number;
  onSelect: (week: number) => void;
  initialSelectedWeek?: number;
  maxAvailableWeek?: number;
}

export default function WeekSelector({
  totalWeeks = 42,
  onSelect,
  initialSelectedWeek,
  maxAvailableWeek,
}: WeekSelectorProps) {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(
    initialSelectedWeek ?? null
  );

  useEffect(() => {
    if (initialSelectedWeek !== undefined) {
      setSelectedWeek(initialSelectedWeek);
    }
  }, [initialSelectedWeek]);

  const handleClick = (week: number, isBlocked: boolean) => {
    if (isBlocked) return;
    setSelectedWeek(week);
    onSelect(week);
  };

  if (selectedWeek === null) {
    return <Loader />;
  }

  const limitWeek = maxAvailableWeek ?? totalWeeks;

  return (
    <div className={css.weeks_wrapper}>
      <ul className={css.weeks_list}>
        {Array.from({ length: totalWeeks }, (_, i) => {
          const week = i + 1;
          const isBlocked = week > limitWeek;
          const isActive = week === selectedWeek;

          const liClass = `
            ${css.weeks_list_item}
            ${isBlocked ? css.week_blocked : isActive ? css.week_active : css.week_available}
          `.trim();

          return (
            <li
              key={week}
              className={liClass}
              onClick={() => handleClick(week, isBlocked)}
            >
              <div className={css.item_title_number}>{week}</div>
              <p className={css.item_title}>Тиждень</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
