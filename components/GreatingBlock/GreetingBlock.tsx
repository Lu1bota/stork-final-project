import css from "./GreetingBlock.module.css";

export default function Greating() {
  return (
    <div className={css.greating_block}>
      <div className={css.app_nav_wrapper}>
        <div className={css.app_nav_link_wrapper}>
          <a className={css.app_nav_main_link} href="#Stork-Main-Page">
            Лелека
          </a>
        </div>
        <div className={css.icon_wrapper}>
          <svg className={css.icon} width="8px" height="12px">
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
