import API from "../api";
var qs = require("qs");

export const getAdminWallet = async (params: {
  key: string;
  page: number;
  walletPerPage: number;
}) => {
  const filter = {
    role: "repository",
    isActived: true,
  };
  const data = {
    page: params.page,
    limit: params.walletPerPage,
    offset: 0,
    filter,
  };

  const queryString = qs.stringify(data, { encode: true });

  return await API.get(`api/v1/admin/wallets-admin?${queryString}`);
};

export const callCreateWallet = async (role: string) => {
  const userToken = localStorage.getItem("user_token");

  return await API.post(`api/v1/admin/create-admin-wallets?role=${role}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};
