import css from "./MomTipCard.module.css";

interface MomTipCardProps {
  tip: string;
}

export default function MomTipCard({
  tip = "Зосередьтеся на здоровому харчуванні",
}: MomTipCardProps) {
  return (
    <div className={css.containerTip}>
      <h3 className={css.titleTip}>Порада для мами</h3>
      <p className={css.textTip}>{tip}</p>
    </div>
  );
}
