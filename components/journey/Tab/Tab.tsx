"use client";
import css from "./Tab.module.css";

interface TabProps {
  activeTab: "Малюк" | "Мама";
  onTabChange: (newTab: "Малюк" | "Мама") => void;
}

export default function Tab({ activeTab, onTabChange }: TabProps) {
  return (
    <div className={css.tab_wrapper}>
      <button
        className={`${css.tab_button} ${activeTab === "Малюк" ? css.active : ""}`}
        onClick={() => onTabChange("Малюк")}
      >
        Розвиток малюка
      </button>
      <button
        className={`${css.tab_button} ${activeTab === "Мама" ? css.active : ""}`}
        onClick={() => onTabChange("Мама")}
      >
        Тіло мами
      </button>
    </div>
  );
}
