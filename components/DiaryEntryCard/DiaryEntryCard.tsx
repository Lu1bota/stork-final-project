import { DiaryEntry } from "@/types/diary";
import css from "./DiaryEntryCard.module.css";
import { formattingDate } from "@/utils/dateUtils";


type DiaryEntryCardProps = {
    entryCard: DiaryEntry
};

export const DiaryEntryCard = ({entryCard}: DiaryEntryCardProps) => {
    return  <>
        <div className={css.cardHeaderContainer}>
            <p className={css.cardTitle}>{entryCard.title}</p>
            <p className={css.cardDate}>{formattingDate(entryCard.createdAt)}</p>
        </div>
        <ul className={css.emotionsContainer}>
            {entryCard.emotions.map((emotion) => (
                <li key={emotion._id} className={css.emotionsItem}>{emotion.title}</li>
            ))}
        </ul>
    </>
}


// Відображення одного запису у вигляді картки у списку.
// Компонент містить в собі:
// Заголовок запису.
// Дату створення.
// Список іконок-емоцій, обраних для запису.