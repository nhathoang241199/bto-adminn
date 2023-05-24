import { getPlans } from "@/services/dailyProfit";
import useSWR from "swr";

const useDailyProfit = () => {
  const { data, error, mutate } = useSWR(
    {
      key: "getPlans",
    },
    getPlans,
  );
  return {
    plans: data?.data.message.sort(
      (item1: any, item2: any) => item1.id - item2.id,
    ),
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useDailyProfit;
