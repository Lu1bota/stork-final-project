'use client';

import React, { useState } from 'react';
import styles from './GoogleAuthBtn.module.css';

type Props = {
  className?: string;
  label?: string;
  onError?: (err: unknown) => void;
};

export default function GoogleAuthBtn({
  className,
  label = 'Зареєструватись через Google',
  onError,
}: Props) {
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    const base = process.env.NEXT_PUBLIC_API_URL;
    if (!base) {
      const err = new Error('NEXT_PUBLIC_API_URL не задано у .env.local');
      onError?.(err);
      console.warn(err.message);
      return;
    }

    try {
      setPending(true);
      const res = await fetch(`${base}/api/get-oauth-url`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error(`OAuth URL HTTP ${res.status}`);
      const body = await res.json();
      const url: string | undefined = body?.data?.url ?? body?.url;
      if (!url) throw new Error('Не отримав URL авторизації');
      window.location.assign(url); 
    } catch (e) {
      onError?.(e);
      console.error('OAuth URL error:', e);
      setPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-busy={pending}
      className={className ? `${styles.btn} ${className}` : styles.btn}
    >
      <span className={styles.iconBox} aria-hidden>
        <svg className={styles.icon} viewBox="0 0 32 32" focusable="false" aria-hidden="true">
          <use href="/sprite.svg#google" />
        </svg>
      </span>
      {pending ? 'Зачекайте…' : label}
    </button>
  );
}
