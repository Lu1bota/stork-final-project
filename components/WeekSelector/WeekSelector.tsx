import css from "./WeekSelector.module.css";

export default function WeekSelector() {
  return (
    <div className={css.weeks_wrapper}>
      <ul className={css.weeks_list}>
        <li className={css.weeks_list_item}>
          <span className={css.item_title_number}>1</span>
          <p className={css.item_title}>Тиждень</p>
        </li>
        <li className={css.weeks_list_item}>
          <span className={css.item_title_number}>2</span>
          <p className={css.item_title}>Тиждень</p>
        </li>
        <li className={css.weeks_list_item}>
          <span className={css.item_title_number}>3</span>
          <p className={css.item_title}>Тиждень</p>
        </li>
        <li className={css.weeks_list_item}>
          <span className={css.item_title_number}>4</span>
          <p className={css.item_title}>Тиждень</p>
        </li>
        <li className={css.weeks_list_item}>
          <span className={css.item_title_number}>5</span>
          <p className={css.item_title}>Тиждень</p>
        </li>
      </ul>
    </div>
  );
}
