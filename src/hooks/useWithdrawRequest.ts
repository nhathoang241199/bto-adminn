import { getWithdrawRequest } from "../services/withdrawRequest";
import { useState } from "react";
import useSWR from "swr";
const amountRequestPerPage = 5;

const useWithdrawRequest = () => {
  const [page, setPage] = useState(1);
  const { data, error, mutate } = useSWR(
    {
      key: "getWithdrawRequest",
      page: page,
      requestPerPage: amountRequestPerPage,
    },
    getWithdrawRequest,
  );
  return {
    data: data?.data.message.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    totalPage: Math.ceil(data?.data.message.total / amountRequestPerPage),
    setPage,
  };
};

export default useWithdrawRequest;
