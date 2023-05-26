import { getDepositRequest } from "../services/depositRequest";
import { getWithdrawRequest } from "../services/withdrawRequest";
import { useState } from "react";
import useSWR from "swr";
const amountRequestPerPage = 2000;

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
    depositTableData: data?.data.message.data.map((item: any) => ({
      id: item.id,
      username: item.userId.username,
      fromWallet: item.fromWallet,
      toWallet: item.toWallet,
      hash: item?.hash || "",
      amount: item.amount,
      coinName: item.coinName,
      date: new Date(item.createdAt).toLocaleString("en-US"),
      status: item.status,
    })),
    isLoading: !error && !data,
    isError: error,
    mutate,
    totalPage: Math.ceil(data?.data.message.total / amountRequestPerPage),
    setPage,
  };
};

export default useDepositRequest;
