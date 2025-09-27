"use client";

import { useQuery } from "@tanstack/react-query";
import { getBabyDetails, getPublicWeekInfo } from "@/lib/api/clientApi";
import type { BabyDetails, WeekInfo } from "@/types/weeks";
// import type { User } from "@/types/user";
import { useAuthStore } from "@/lib/store/authStore";

// Вычисление недели беременности до появления бейбика
function calculateCurrentWeek(dueDate: string): number {
  try {
    const due = new Date(dueDate);
    const today = new Date();

    // Беременность 40 недель (280 дней) == дата зачатия 40 недель назад от даты родов
    const conceptionDate = new Date(due);
    conceptionDate.setDate(due.getDate() - 280);

    // Разница между сегодня и датой зачатия в днях
    const diffTime = today.getTime() - conceptionDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Дни в недели + округление
    const weeks = Math.floor(diffDays / 7);

    // Ограничить от 1 до 40
    return Math.max(1, Math.min(40, weeks));
  } catch (error) {
    console.error("Error calculating current week:", error);
    // Возврат - среднюю неделю как fallback если обломиилось
    return 20;
  }
}

export function useBabyDetails() {
  const { user, isAuthenticated } = useAuthStore();

  // Вычисляем текущую неделю на основе dueDate
  const currentWeek = user?.dueDate
    ? calculateCurrentWeek(user.dueDate)
    : undefined;

  return useQuery({
    queryKey: ["babyDetails", currentWeek ?? "public", isAuthenticated],
    queryFn: async () => {
      try {
        if (isAuthenticated && currentWeek) {
          const babyData = await getBabyDetails(currentWeek);
          return {
            ...babyData,
            size: `Приблизно ${babyData.size} см`,
            weight: `Близько ${babyData.weight} грамів`,
          } as unknown as BabyDetails;
        } else {
          const publicWeekInfo: WeekInfo = await getPublicWeekInfo();
          const baby = publicWeekInfo.baby;

          return {
            week: baby.week,
            size: `Приблизно ${baby.size} см`,
            weight: `Близько ${baby.weight} грамів`,
            analogy: baby.analogy,
            activity: baby.activity,
            development: baby.development,
            fact: baby.fact,
            image: baby.image,
            momDailyTips: baby.momDailyTips,
          } as unknown as BabyDetails;
        }
      } catch (error) {
        console.error("Error fetching baby details:", error);
        try {
          const publicWeekInfo: WeekInfo = await getPublicWeekInfo();
          const baby = publicWeekInfo.baby;

          return {
            // week: baby.week,
            size: `Приблизно ${baby.size} см`,
            weight: `Близько ${baby.weight} грамів`,
            // analogy: baby.analogy,
            activity: baby.activity,
            development: baby.development,
            // fact: baby.fact,
            image: baby.image,
            // momDailyTips: baby.momDailyTips,
          };
        } catch (fallbackError) {
          console.error("Fallback also failed:", fallbackError);
          return getFallbackBabyDetails();
        }
      }
    },
    staleTime: 1000 * 60 * 5, // 5 минут
    retry: (failureCount, error) => {
      // Не повторяем запрос при ошибках авторизации
      if (error?.message?.includes("401") || error?.message?.includes("403")) {
        return false;
      }
      return failureCount < 2;
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });
}

// Fallback данные для случаев, когда API недоступен
function getFallbackBabyDetails(): BabyDetails {
  return {
    week: 1,
    size: 0,
    weight: 0,
    analogy: "Ваш малюк розміром з банан",
    activity:
      "На цьому етапі вагітності ще немає. Тиждень відраховується від першого дня останньої менструації, коли організм тільки готується до можливого зачаття.",
    development:
      "Фактично, на першому тижні вагітності запліднення ще не відбулося. Організм жінки проходить через менструацію та починає готувати домінантний фолікул, з якого згодом вийде яйцеклітина, готова до запліднення. Це підготовчий етап.",
    fact: "Близько 60% жінок не знають, що їхня вагітність відраховується ще до моменту фактичного зачаття.",
    image: "https://ftp.goit.study/img/lehlehka/6895ce04a5c677999ed2af25.webp",
    momDailyTips: [
      "Якщо ви плануєте вагітність, почніть приймати фолієву кислоту (400 мкг щодня) для профілактики вад нервової трубки у плода.",
      "Зосередьтеся на здоровому харчуванні, багатому на фрукти, овочі та цільні злаки.",
      "Постарайтеся відмовитися від куріння та вживання алкоголю, оскільки це може вплинути на фертильність та майбутню вагітність.",
      "Обговоріть з лікарем будь-які ліки, які ви приймаєте, щоб переконатися, що вони безпечні для вагітності.",
      "Подбайте про якісний сон, він важливий для гормонального балансу.",
      "Включіть у свій розклад помірну фізичну активність, наприклад, прогулянки або йогу.",
      "Слідкуйте за своїм менструальним циклом, щоб краще розуміти період овуляції.",
    ],
  };
}
