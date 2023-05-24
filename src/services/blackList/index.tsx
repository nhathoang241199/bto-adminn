import API from "../api";
var qs = require("qs");

type TParam = {
  key: string;
  page: number;
  userPerPage: number;
};

export const getBlackList = async (params: TParam) => {
  const data = {
    page: params.page,
    limit: params.userPerPage,
    offset: 0,
  };

  const queryString = qs.stringify(data, { encode: true });

  return await API.get(`api/v1/admin/users-blacklist?${queryString}`);
};

export const callUnbanUser = async (userId: string) => {
  const userToken = localStorage.getItem("user_token");

  return await API.post(
    "api/v1/admin/unlock-user",
    {
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
};
