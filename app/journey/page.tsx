"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPrivateWeekInfo } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";

export default function JourneyPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectToCurrentWeek = async () => {
      try {
        const weekInfo = await getPrivateWeekInfo();
        router.replace(`/journey/${weekInfo.week}`);
      } catch {
        router.replace("/auth/login");
      }
    };
    redirectToCurrentWeek();
  }, [router]);

  return <Loader />;
}