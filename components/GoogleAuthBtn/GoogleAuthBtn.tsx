'use client';

import { useMutation } from '@tanstack/react-query';
import styles from './GoogleAuthBtn.module.css';

type Props = {
  className?: string;
  label?: string;
  onError?: (err: unknown) => void;
  state?: string;                    
  callbackPathOverride?: string;     
};

function siteOrigin(): string {
  return typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_SITE_URL ?? '');
}

function callbackPath(): string {
  return process.env.NEXT_PUBLIC_OAUTH_CALLBACK_PATH || '/auth/confirm-google-auth';
}

export default function GoogleAuthBtn({ className, label = 'Зареєструватись через Google', onError, state, callbackPathOverride }: Props) {
  const mutation = useMutation<string, Error, { redirectUri: string; state?: string }>({
    mutationKey: ['get-oauth-url'],
    mutationFn: async ({ redirectUri, state }) => {
      const base = process.env.NEXT_PUBLIC_API_URL;
      if (!base) throw new Error('NEXT_PUBLIC_API_URL не задано');

      const u = new URL(`${base}/api/get-oauth-url`);
      u.searchParams.set('redirect_uri', redirectUri);
      if (state) u.searchParams.set('state', state);

      const res = await fetch(u.toString(), { method: 'GET', credentials: 'include' });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `OAuth URL HTTP ${res.status}`);
      }

      const body: unknown = await res.json().catch(() => ({}));
      const authUrl =
        typeof (body as { data?: { url?: unknown } }).data?.url === 'string'
          ? (body as { data: { url: string } }).data.url
          : typeof (body as { url?: unknown }).url === 'string'
          ? (body as { url: string }).url
          : null;

      if (!authUrl) throw new Error('Не отримав URL авторизації');
      return authUrl;
    },
    onSuccess: (authUrl) => window.location.assign(authUrl),
    onError,
  });

  const site = siteOrigin();
  const cbPath = callbackPathOverride || callbackPath();
  const redirectUri = `${site}${cbPath}`;

  const handleClick = () => {
    mutation.mutate({ redirectUri, state });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={mutation.isPending}
      aria-busy={mutation.isPending}
      className={className ? `${styles.btn} ${className}` : styles.btn}
    >
      <span className={styles.iconBox} aria-hidden>
        <svg className={styles.icon} viewBox="0 0 32 32" focusable="false" aria-hidden="true">
          <use href="/sprite.svg#google" />
        </svg>
      </span>
      {mutation.isPending ? 'Зачекайте…' : label}
    </button>
  );
}
