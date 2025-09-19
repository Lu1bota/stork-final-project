'use client'; 

import React from 'react'
import styles from './OnboardingForm.module.css'
import OnboardingForm from './OnboardingForm'

export default function OnboardingPage () {
    return (
        <>
        <div className={styles.navbar}>
            <img src='/logo.svg' alt='logo' width={95} height={29}></img>
        </div>
        <main className={styles.page}>
<div className={styles.left}>
<h1 className={styles.title}>Давайте познайомимось ближче</h1>
<OnboardingForm/>
</div>
<div className={styles.right}>
<img src="/seedling.png" alt="Росток" width={720} height={900} className={styles.image}/>
</div>
  </main>
  </>
    )
}