"use client";
import ErrorView from "@/components/ErrorPage/ErrorPage";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <ErrorView
      code={500}
      title="Щось пішло не так"
      message={error.message}
      homeHref="/"
      reset={reset}          
    />
  );
}