// import { getMe } from "@/lib/api/clientApi";
import css from "./GreetingBlock.module.css";

export default async function Greating() {
  // const { name } = await getMe();
  // console.log("name >> ", name);
  return (
    <div className={css.greating_block}>
      <div className={css.app_nav_wrapper}>
        <div className={css.app_nav_link_wrapper}>
          <a className={css.app_nav_link} href="#Stork-Main-Page">
            Лелека
          </a>
        </div>
        <div className={css.icon_wrapper}>
          <svg className={css.icon} width="20px" height="24px">
            <use href="/sprite.svg#chevron_right"></use>
          </svg>
        </div>
        <div className={css.app_nav_link_wrapper}>
          <a className={css.app_nav_link} href="#JourneyMainPage">
            Подорож
          </a>
        </div>
      </div>
      <div className={css.greating_wrapper}>
        <h2 className={css.greating}>Доброго ранку, Ганна!</h2>
      </div>
    </div>
  );
}
