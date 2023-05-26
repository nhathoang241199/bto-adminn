import { getAdminWallet } from "../services/adminWallet";
import { useState } from "react";
import useSWR from "swr";
const amountWalletPerPage = 100;

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
    adminWalletTableData: data?.data.message.data.map((item: any) => ({
      id: item.id,
      address: item.publicAddress,
      role: item.role,
      active: item.isActived,
      createdAt: new Date(item.createdAt).toLocaleString("en-US"),
      balance: item.balance,
    })),
    isLoading: !error && !data,
    isError: error,
    mutate,
    totalPage: Math.ceil(data?.data.message.total / amountWalletPerPage),
    setPage,
  };
};

export default useAdminWallet;
