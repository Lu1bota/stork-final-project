import axios from "axios";

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

export type WeekListResponse = {
  weeks: WeekBaby[];
};

axios.defaults.baseURL = "https://nodejs-stork.onrender.com/api";

export const getWeeks = async () => {
  const res = await axios.get<WeekListResponse>("/weeks/public");
  return res.data;
};
