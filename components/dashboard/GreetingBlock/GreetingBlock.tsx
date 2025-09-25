import css from "./GreetingBlock.module.css";

interface GreetingBlockProps {
  userName: string;
}

export default function GreetingBlock({
  userName = "майбутня мама",
}: GreetingBlockProps) {
  return <h1 className={css.title}>Доброго ранку, {userName}!</h1>;
}
