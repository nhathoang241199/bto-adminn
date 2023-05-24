import API from "../api";
var qs = require("qs");

export enum ERole {
  SUPER_ADMIN = "super-admin",
  ADMIN = "admin",
  OPERATOR = "operators",
}

export type TUpdateAccount = {
  username: string;
  role: ERole;
  privileges: string;
};

export type TCreateAccount = {
  username: string;
  password: string;
  role: ERole;
};

export const handleCreateUser = async (data: TCreateAccount) => {
  const userToken = localStorage.getItem("user_token");

  return await API.post(
    "api/v1/auth/create-admin",
    {
      username: data.username,
      password: data.password,
      role: data.role,
      privileges: 0,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
};

export const handleUpdateUser = async (data: TUpdateAccount) => {
  const userToken = localStorage.getItem("user_token");

  return await API.post("api/v1/auth/change-admin", data, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export const getAdminUser = async (params: {
  key: string;
  page: number;
  userPerPage: number;
}) => {
  const filter = { username: null as string, role: null as string };
  const data = {
    page: params.page,
    limit: params.userPerPage,
    offset: 0,
    filter,
  };

  const queryString = qs.stringify(data, { encode: true });

  return await API.get(`api/v1/admin/adminlist?${queryString}`);
};
