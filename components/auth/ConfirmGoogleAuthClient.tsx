'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { User } from '@/types/user';
import css from './ConfirmGoogleAuthClient.module.css';

type Props = { code: string | null; error: string | null; successRedirect?: string };
type ConfirmResponse = { data?: { user?: User } };

function msgFrom(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === 'string') return e;
  try { return JSON.stringify(e); } catch { return String(e); }
}

export default function ConfirmGoogleAuthClient({
  code,
  error,
  successRedirect = '/profile/edit',
}: Props) {
  const router = useRouter();
  const setUser = useAuthStore(s => s.setUser);
  const [msg, setMsg] = useState('Завершую авторизацію…');
  const base = process.env.NEXT_PUBLIC_API_URL;

  const confirmMutation = useMutation<ConfirmResponse, Error, { code: string }>({
    mutationKey: ['confirm-oauth'],
    mutationFn: async ({ code }) => {
      if (!base) throw new Error('NEXT_PUBLIC_API_URL не задано');
      const res = await fetch(`${base}/api/confirm-oauth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // обовʼязково, щоб сервер міг поставити HttpOnly refresh cookie
        body: JSON.stringify({ code }), // <-- ТІЛЬКИ code
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `HTTP ${res.status}`);
      }
      return (await res.json().catch(() => ({}))) as ConfirmResponse;
    },
    onSuccess: (data) => {
      const u = data?.data?.user;
      if (u) setUser(u);
      setMsg('Готово! Перенаправляю…');
      router.replace(successRedirect);
    },
    onError: (e) => setMsg(`Помилка підтвердження OAuth: ${msgFrom(e)}`),
  });

  useEffect(() => {
    if (error) { setMsg(`Google повернув помилку: ${error}`); return; }
    if (!base) { setMsg('NEXT_PUBLIC_API_URL не задано'); return; }
    if (!code) { setMsg('У callback-URL відсутній параметр ?code'); return; }
    confirmMutation.mutate({ code });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, error, base]);

  const stateClass =
    confirmMutation.isPending ? css.pending :
    confirmMutation.isError || !!error ? css.error : css.ok;

  return (
    <section className={css.wrap} aria-live="polite" role="status">
      <div className={`${css.card} ${stateClass}`}>
        {confirmMutation.isPending && <span className={css.spinner} aria-hidden />}
        <p className={css.msg}>
          {confirmMutation.isPending ? 'Завершую авторизацію…' : msg}
        </p>
      </div>
    </section>
  );
}
