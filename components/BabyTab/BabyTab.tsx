import Image from "next/image";
import { BabyDetails } from "@/types/weeks.js";
import css from "./BabyTab.module.css";
import Loader from "../Loader/Loader";

interface BabyTabProps {
  data: BabyDetails;
}

export default function BabyTab({ data }: BabyTabProps) {
  return (
    <div>
      <div>
        <Image src={data.image} alt={data.analogy} width={287} height={379} />
        <h2>Ваш малюк зараз розміром з {data.analogy}</h2>
      </div>

      <div>
        <div>
          <p>{data.activity}</p>
          <p>{data.development}</p>
        </div>
        <div>
          <div>
            <svg>
              <use href="/sprite.svg#star_shine"></use>
            </svg>
            <h2>Цікавий факт тижня</h2>
          </div>
          <p>{data.fact}</p>
        </div>
      </div>
    </div>
  );
}
