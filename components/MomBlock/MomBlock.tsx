import css from "../MomBlock/MomBlock.module.css";
import TasksReminderCard from "../TasksReminderCard/TasksReminderCard";

export default function MomBlock() {
  return (
      <div className={css.mom_container}>
          <div className={css.mom_tag_tip_container}>
      <div className={css.mom_card}>
        <h2 className={css.mom_cardTitle}>Як ви можете почуватись</h2>
        <div className={css.mom_tags_container}>
          <div className={css.mom_tag}>Нудота</div>
          <div className={css.mom_tag}>Втома</div>
          <div className={css.mom_tag}>Мінливий настрій</div>
        </div>
        <p className={css.mom_cardText}>
          Ви можете відчувати легке потягування внизу живота. Ранкова нудота
          може все ще турбувати, але скоро має піти на спад. Настрій може бути
          мінливим — це нормально.
        </p>
      </div>

      <div className={css.mom_card}>
        <h2 className={css.mom_cardTitle}>Поради для вашого комфорту</h2>
        <div className={css.mom_tip}>
                  <div className={css.mom_iconcontainer}>
            <svg
              className={css.mom_icon}
              aria-hidden="true"
              width="24"
              height="24"
            >
              <use href="/sprite.svg#fork_spoon" />
            </svg>
          </div>
          <div className={css.mom_tipContent}>
            <h3 className={css.mom_tipTitle}>Харчування</h3>
            <p className={css.mom_tipText}>
              Зосередьтеся на продуктах, багатих на вітамін С (цитрусові, ківі), він допомагає тілу засвоювати залізо.
            </p>
          </div>
        </div>

        <div className={css.mom_tip}>
          <div className={css.mom_iconContainer}>
            {" "}
           
              <svg
                className={css.tipIcon}
                aria-hidden="true"
                width="24"
                height="24"
              >
                <use href="/sprite.svg#fitness_center" />
              </svg>
            
          </div>
          <div className={css.mom_tipContent}>
            <h3 className={css.mom_tipTitle}>Активність</h3>
            <p className={css.mom_tipText}>
              Якщо почуваєтесь добре, спробуйте йогу для вагітних. Вона допомагає розслабитись і зняти напругу.
            </p>
          </div>
        </div>

        <div className={css.mom_tip}>
          <div className={css.mom_iconcontainer}>
            <svg
              className={css.mom_icon}
              aria-hidden="true"
              width="24"
              height="24"
            >
              <use href="/sprite.svg#chair" />
            </svg>
          </div>
          <div className={css.mom_tipContent}>
            <h3 className={css.mom_tipTitle}>Відпочинок</h3>
            <p className={css.mom_tipText}>
              Не соромтесь просити про допомогу і більше відпочивайте, коли
              відчуваєте втому.
            </p>
          </div>
        </div>
      </div>
</div>
      <div>
        <TasksReminderCard/>
      </div>
    </div>
  );
}
