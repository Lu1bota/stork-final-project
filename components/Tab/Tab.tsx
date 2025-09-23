"use client";
import css from "./Tab.module.css";
import { useState } from "react";
import MomBlock from "../MomBlock/MomBlock";
import InfoBlock from "../InfoBlock/InfoBlock";

export default function Tab() {
  const [activeTab, setActiveTab] = useState("Малюк");

  return (
    <div className={css.tab_wrapper}>
      <div className={css.tab_buttons_container}>
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
       <div className={css.tab_content}>
        {activeTab === "Мама" && <MomBlock />}
        {activeTab === "Малюк" && <InfoBlock />}
      </div>
    </div>
  );

  

}


