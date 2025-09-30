"use client";
import css from "./Tab.module.css";

interface TabProps {
  activeTab: "baby" | "mom";
  onTabChange: (newTab: "baby" | "mom") => void;
}

export default function Tab({ activeTab, onTabChange }: TabProps) {
  return (
    <div className={css.tab_wrapper}>
      <button
        className={`${css.tab_button} ${activeTab === "baby" ? css.active : ""}`}
        onClick={() => onTabChange("baby")}
      >
        Розвиток малюка
      </button>
      <button
        className={`${css.tab_button} ${activeTab === "mom" ? css.active : ""}`}
        onClick={() => onTabChange("mom")}
      >
        Тіло мами
      </button>
    </div>
  );
}
