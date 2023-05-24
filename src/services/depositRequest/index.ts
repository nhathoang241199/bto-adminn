import API from "../api";
var qs = require("qs");

export const getDepositRequest = async (params: {
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

  return await API.get(`api/v1/admin/deposit-requests?${queryString}`);
};
