import { getAdminWallet } from "../services/adminWallet";
import { useState } from "react";
import useSWR from "swr";
const amountWalletPerPage = 5;

const useAdminWallet = () => {
  const [page, setPage] = useState(1);
  const { data, error, mutate } = useSWR(
    {
      key: "getAdminWallet",
      page: page,
      walletPerPage: amountWalletPerPage,
    },
    getAdminWallet,
  );
  return {
    data: data?.data.message.data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    totalPage: Math.ceil(data?.data.message.total / amountWalletPerPage),
    setPage,
  };
};

export default useAdminWallet;
