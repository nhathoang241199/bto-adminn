import { getWithdrawRequest } from "../services/withdrawRequest";
import { useState } from "react";
import useSWR from "swr";
const amountRequestPerPage = 2000;

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
    withdrawTableData: data?.data.message.data.map((item: any) => ({
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

export default useWithdrawRequest;
