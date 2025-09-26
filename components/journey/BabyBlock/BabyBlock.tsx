import { BabyDetails } from "@/types/weeks";
import css from "./BabyBlock.module.css";
import Image from "next/image";

interface BabyBlockProps {
  baby: BabyDetails;
}

export default function BabyBlock({ baby }: BabyBlockProps) {
  return (
    <div className={css.info_wrapper}>
      <div className={css.comparison}>
        <Image
          src={baby.image}
          className={css.comparison_img}
          alt={`Розмір малюка на ${baby.week} тижні`}
          width={232}
          height={379}
        />
        <p className={css.comparison_descr}>{baby.analogy}</p>
      </div>
      <div className={css.detailed_descr_fact_box}>
        <div className={css.detailed_descr_wrapper}>
          <p className={css.detailed_descr}>{baby.development}</p>
          <p className={css.detailed_descr}>{baby.activity}</p>
          <p className={css.detailed_descr}>{baby.fact}</p>
        </div>
        <div className={css.fact_box_wrapper}>
          <div className={css.title_wrapper}>
            <div className={css.icon_wrapper}>
              <svg className={css.icon} width="22px" height="19px">
                <use href="/sprite.svg#star_shine"></use>
              </svg>
            </div>
            <p className={css.title}>Цікавий факт тижня</p>
          </div>
          <div className={css.fact_of_the_week_text_wrapper}>
            <p className={css.fact_of_the_week_text}>{baby.fact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
