import Container from "@/components/Container/Container"
import { DiaryList } from "@/components/Diary/DiaryList/DiaryList";
import { headers } from "next/headers";
import { getDevice } from "@/utils/getDevice";
import css from "./DiaryPage.module.css";

export default async function DiaryPage() {
    const ua = (await headers()).get("user-agent");
    const device = getDevice(ua); 
    const isMobile = device === "mobile" || device === "tablet";

    return (
        <Container>
                {isMobile && <p>Header</p>}
                <p>Diary Header</p>
                <p>GreetingBlock</p>
                <div className={css.diaryContainer}>
                    <DiaryList isMobile={isMobile} />
                </div>
        </Container>
    );
}