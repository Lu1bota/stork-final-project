import { headers } from "next/headers";
import AppLayout from "@/components/AppLayout/AppLayout";
import { DiaryList } from "@/components/Diary/DiaryList/DiaryList";
import { getDevice } from "@/utils/getDevice";
import css from "./DiaryPage.module.css";

export default async function DiaryPage() {
    const ua = (await headers()).get("user-agent");
    const device = getDevice(ua); 
    const isMobile = device === "mobile" || device === "tablet";

    return (
        <AppLayout>
            <div className={css.diaryContainer}>
                <DiaryList isMobile={isMobile} />
            </div>
        </AppLayout>
    );
}