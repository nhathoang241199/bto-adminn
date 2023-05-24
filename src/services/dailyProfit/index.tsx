import API from "../api";

export type TSetProfitPercent = {
  planId: string;
  percent: string;
};

export const getPlans = async () => {
  return await API.get("api/v1/admin/plans");
};

export const callSetProfitPercent = async (data: TSetProfitPercent) => {
  const userToken = localStorage.getItem("user_token");

  return await API.post("api/v1/admin/set-commission-rate", data, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};
