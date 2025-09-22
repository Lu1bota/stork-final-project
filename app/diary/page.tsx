import Container from "@/components/Container/Container"
import { DiaryList } from "@/components/DiaryList/DiaryList";
import { headers } from "next/headers";
import css from "./DiaryPage.module.css";
import { getEmotions } from "@/lib/api/diary";
import { getDevice } from "@/utils/getDevice";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getDiaryEntries } from "@/lib/api/clientApi";


export default async function DiaryPage() {
    const queryClient = new QueryClient();

    const ua = (await headers()).get("user-agent");
    const device = getDevice(ua); 
    const isMobile = device === "mobile" || device === "tablet";

    const entries = await getDiaryEntries();

    await queryClient.prefetchQuery({
        queryKey: ['emotions'],
        queryFn: getEmotions,
    });

    return (
        <Container>
            <HydrationBoundary state={dehydrate(queryClient)}>
                {isMobile && <p>Header</p>}
                <p>Diary Header</p>
                <p>GreetingBlock</p>
                <div className={css.diaryContainer}>
                    <DiaryList entries={entries} isMobile={isMobile} />
                </div>
            </HydrationBoundary>
        </Container>
    );
}





// На десктопі:
// сторінка відображає всі блоки одночасно за маршрутом /diary.

// На мобілці та планшеті:
// Маршрут /diary відображає список записів DiaryList.
// Маршрут /diary/[entryId] відображає деталі конкретного запису DiaryEntryDetails.

// Компоненти:
// GreetingBlock,
// DiaryList,
// DiaryEntryDetails,

// Адаптивність:
// Десктоп: Всі блоки мають фіксовану висоту згідно з макетом. У разі переповнення контентом з'являється внутрішній вертикальний скрол.
// У разі відсутності записів, в блоці зі змістом запису щоденника повинен відображатись плесхолдер з текстом: "Наразі записи у щоденнику відстні"
// Мобілка/Планшет: Висота блоків динамічно змінюється відповідно до наповнення контентом.