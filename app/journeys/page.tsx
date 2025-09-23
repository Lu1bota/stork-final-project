'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPrivateWeekInfo } from "@/lib/api/clientApi";
import Loader from "@/components/Loader/Loader";

export default function JourneysPage() {
    const router = useRouter();

    useEffect(() => {
        const loadWeekInfo = async () => {
            try {
                const weekInfo = await getPrivateWeekInfo();
                router.replace(`/journeys/${weekInfo.week}`);
            } catch (error) {
                router.replace('/auth/login');
            }
        }
        loadWeekInfo();
    }, [router])
    
    return (
        <Loader/>
    )
}