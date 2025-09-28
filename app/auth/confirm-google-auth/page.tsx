'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === 'string') return e;
  try { return JSON.stringify(e); } catch { return String(e); }
}

function getSiteOrigin(): string {
  return typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL || '';
}

export default function ConfirmGoogleAuthPage() {
  const router = useRouter();
  const qs = useSearchParams();
  const [msg, setMsg] = useState('Завершую авторизацію…');

  const base = process.env.NEXT_PUBLIC_API_URL;
  const redirectUri = useMemo(() => `${getSiteOrigin()}/confirm-google-auth`, []);

  const code = useMemo(() => qs.get('code'), [qs]);
  const err  = useMemo(() => qs.get('error'), [qs]);

  useEffect(() => {
    if (err) { setMsg(`Google повернув помилку: ${err}`); return; }
    if (!base) { setMsg('NEXT_PUBLIC_API_URL не задано'); return; }
    if (!code) { setMsg('У callback-URL відсутній параметр ?code'); return; }

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`${base}/api/confirm-oauth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ code, redirectUri }),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          throw new Error(text || `HTTP ${res.status}`);
        }

        if (cancelled) return;
        setMsg('Готово! Перенаправляю…');
        router.replace('/profile/edit');
      } catch (e) {
        if (cancelled) return;
        setMsg(`Помилка підтвердження OAuth: ${getErrorMessage(e)}`);
      }
    })();

    return () => { cancelled = true; };
  }, [code, err, router, base, redirectUri]);

  return <p style={{ padding: 24 }}>{msg}</p>;
}
