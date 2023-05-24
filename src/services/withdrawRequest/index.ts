import API from "../api";
var qs = require("qs");

type TCallApproveData = {
  requestId: string;
  fromAdminWallet: string;
};

export const getWithdrawRequest = async (params: {
  key: string;
  page: number;
  requestPerPage: number;
}) => {
  const data = {
    page: params.page,
    limit: params.requestPerPage,
    offset: 0,
  };

  const queryString = qs.stringify(data, { encode: true });

  return await API.get(`api/v1/admin/withdraw-requests?${queryString}`);
};

export const callRejectWithdraw = async (requestId: string) => {
  const userToken = localStorage.getItem("user_token");

  return await API.post(
    "api/v1/admin/reject-withdraw",
    {
      requestId,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );
};
export const callApproveWithdraw = async (data: TCallApproveData) => {
  const userToken = localStorage.getItem("user_token");

  return await API.post("api/v1/admin/approve-withdraw", data, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};
