import { getDepositRequest } from "@/services/depositRequest";
import { getWithdrawRequest } from "@/services/withdrawRequest";
import { useState } from "react";
import useSWR from "swr";
const amountRequestPerPage = 5;

const useDepositRequest = () => {
  const [page, setPage] = useState(1);
  const { data, error, mutate } = useSWR(
    {
      key: "getDepositRequest",
      page: page,
      requestPerPage: amountRequestPerPage,
    },
    getDepositRequest,
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

export default useDepositRequest;
