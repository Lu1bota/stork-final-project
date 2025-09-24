import css from "./BabyBlock.module.css";
import Image from "next/image";

export default function BabyBlock() {
  return (
    <div className={css.info_wrapper}>
      <div className={css.comparison}>
        <Image
          src="/f5e79a5085d0888f554314cf6f62e828.jpg"
          className={css.comparison_img}
          alt="Порівняння з дитиною"
          width={232}
          height={379}
        />
        <p className={css.comparison_descr}>
          Ваш малюк зараз розміром з Авокадо
        </p>
      </div>
      <div className={css.detailed_descr_fact_box}>
        <div className={css.detailed_descr_wrapper}>
          <p className={css.detailed_descr}>
            Вітаємо з важливою втіхою! Ваш малюк офіційно перейшов від стадії
            ембріона до плоду. Це ключовий момент у його розвитку, який означає,
            що всі основні органи та системи вже закладені на своїх місцях.
          </p>
          <p className={css.detailed_descr}>
            Крихітне серце вже повністю сформоване і старанно б&apos;ється,
            перекачуючи кров. Мозок розвивається неймовірними темпами, а нирки
            починають виробляти першу сечу.
          </p>
          <p className={css.detailed_descr}>
            Кісточки та хрящі продовжують укріплюватися, формуючи скелет, і вже
            можна розрізнити крихітні коліна, лікті та зап&apos;ястя. На ручках
            та ніжках зникають перетинки між пальцями, а на їхніх кінчиках
            з&apos;являються основи для майбутніх нігтиків.
          </p>
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
            <p className={css.fact_of_the_week_text}>
              Малюк вже активно рухається, згинаючи ручки та ніжки, хоча ви
              цього ще не можете відчути.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
