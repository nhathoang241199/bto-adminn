import API from "../api";
var qs = require("qs");

type TParam = {
  key: string;
  page: number;
  userPerPage: number;
  searchUserName: string;
  active: boolean;
};

export type TChangeUserPassword = {
  userId: string;
  password: string;
};

export type TBanUser = {
  userId: string;
  reason: string;
};

export const getPortalUser = async (params: TParam) => {
  const filter = {
    active: params.active,
    username: params.searchUserName,
  };
  const data = {
    page: params.page,
    limit: params.userPerPage,
    offset: 0,
    filter,
  };

  const queryString = qs.stringify(data, { encode: true });

  return await API.get(`api/v1/admin/users?${queryString}`);
};

export const callChangeUserPassword = async (data: TChangeUserPassword) => {
  const userToken = localStorage.getItem("user_token");

  return await API.post("api/v1/admin/change-password-user", data, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export const callBanUser = async (data: TBanUser) => {
  const userToken = localStorage.getItem("user_token");

  return await API.post("api/v1/admin/lock-user", data, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};
