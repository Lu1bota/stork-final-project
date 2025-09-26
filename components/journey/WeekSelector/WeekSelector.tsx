"use client";
import { useEffect, useRef, useState } from "react";
import css from "./WeekSelector.module.css";
import { useRouter } from "next/navigation";

interface WeekSelectorProps {
  activeWeek: number;              
  totalWeeks?: number;               
  maxAvailableWeek: number;          
  onWeekChange: (week: number) => void; 
}

export default function WeekSelector({
  activeWeek,
  totalWeeks = 42,
  maxAvailableWeek,
  onWeekChange,
}: WeekSelectorProps) {
  const router = useRouter();
 const [selectedWeek, setSelectedWeek] = useState(activeWeek);
  const activeRef = useRef<HTMLLIElement | null>(null);
  const itemsRef = useRef<HTMLUListElement | null>(null);
    

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
const [startX, setStartX] = useState<number>(0);
const [scrollLeft, setScrollLeft] = useState<number>(0);


    useEffect(() => {
    if (activeWeek !== undefined) {
      setSelectedWeek(activeWeek);
    }
    }, [activeWeek]);
  
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "auto", 
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedWeek]);

  const handleWeekClick = (week: number) => {
    if (week > maxAvailableWeek) return; 
    setSelectedWeek(week);
    onWeekChange(week);
    router.push(`/journey/${week}`);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!itemsRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - itemsRef.current.offsetLeft);
    setScrollLeft(itemsRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsMouseDown(false);

  const handleMouseUp = () => setIsMouseDown(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!isMouseDown || !itemsRef.current) return;
    e.preventDefault();
    const x = e.pageX - itemsRef.current.offsetLeft;
    const walk = (x - startX) * 1; 
    itemsRef.current.scrollLeft = scrollLeft - walk;
  };


  return (
    <div className={css.weeks_wrapper}
    >
      <ul className={css.weeks_list}
    ref={itemsRef}
    onMouseDown={handleMouseDown}
    onMouseLeave={handleMouseLeave}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}>
        {Array.from({ length: totalWeeks }, (_, i) => {
          const week = i + 1;
          const isActive = week === selectedWeek;
          const isDisabled = week > maxAvailableWeek;
          return (
            <li key={week} className={css.weeks_list_item} ref={isActive ? activeRef : null}>
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
