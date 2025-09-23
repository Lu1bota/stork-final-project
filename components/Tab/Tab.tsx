"use client";
import css from "./Tab.module.css";
import { useState } from "react";

export default function Tab() {
  const [activeTab, setActiveTab] = useState("Малюк");

  return (
    <div className={css.tab_wrapper}>
      <button
        className={`${css.tab_button} ${activeTab === "Малюк" ? css.active : ""}`}
        onClick={() => setActiveTab("Малюк")}
      >
        Розвиток малюка
      </button>
      <button
        className={`${css.tab_button} ${activeTab === "Мама" ? css.active : ""}`}
        onClick={() => setActiveTab("Мама")}
      >
        Тіло мами
      </button>
    </div>
  );
}
