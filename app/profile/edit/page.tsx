"use client";

import React from "react";
import styles from "./OnboardingForm.module.css";
import OnboardingForm from "./OnboardingForm";
import Image from 'next/image';

export default function OnboardingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.page}>
        <div className={styles.left}>
        <div className={styles.navbar}>
        <img src="/logo.svg" alt="logo" width={105} height={45} />
      </div>
          <h1 className={styles.title}>Давайте познайомимось ближче</h1>
          <OnboardingForm />
        </div>
        <div className={styles.right}>
          <Image
            src="/seedling.png"
            alt="Паросток"
            width={720}
            height={900}
            className={styles.image}
            priority
          />
        </div>
      </div>
    </div>
  );
}
