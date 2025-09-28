import ConfirmGoogleAuthClient from '@/components/auth/ConfirmGoogleAuthClient';

export default function Page({ searchParams }: { searchParams?: { code?: string; error?: string } }) {
  return (
    <ConfirmGoogleAuthClient
      code={searchParams?.code ?? null}
      error={searchParams?.error ?? null}
    />
  );
}