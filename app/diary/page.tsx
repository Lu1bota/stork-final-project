import AppLayout from "@/components/AppLayout/AppLayout";
import { DiaryList } from "@/components/Diary/DiaryList/DiaryList";
import css from "./DiaryPage.module.css";

export default async function DiaryPage() {

    return (
        <AppLayout>
            <div className={css.diaryContainer}>
                <DiaryList />
            </div>
        </AppLayout>
    );
}