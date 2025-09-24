"use client";

import ErrorView from "@/components/ErrorPage/ErrorPage";

export default function NotFound() {
  return (
    <ErrorView
      code={404}
      title="Сторінку не знайдено"
      message="Можливо, адресу змінено або вона невірна."
      homeHref="/"
    />
  );
}