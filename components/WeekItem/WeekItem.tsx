import css from "./WeekItem.module.css";

export type WeekBaby = {
  week: number;
  analogy: string;
  size: number;
  weight: number;
  activity: string;
  development: string;
  fact: string;
  img: string;
};

type Props = {
  item: WeekBaby;
};

export default function WeekItem({ item }: Props) {
  return (
    <li className={css.weeks_list_item}>
      <a className={css.item_link}>
        <span className={css.item_title_number}>{item.week}</span>
        <p className={css.item_title}>Тиждень</p>
      </a>
    </li>
  );
}
