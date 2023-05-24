import { callGetAccountInfo } from "../services/accountInfo";
import { getAdminUser } from "../services/adminUser";
import { useState } from "react";
import useSWR from "swr";
const amountUserPerPage = 5;

const useAdminUser = () => {
  const [page, setPage] = useState(1);
  const { data, error, mutate } = useSWR(
    {
      key: "getAdminUser",
      page: page,
      userPerPage: amountUserPerPage,
    },
    getAdminUser,
  );

  const { data: accountData } = useSWR("getAccountInfo", callGetAccountInfo);

  return {
    accountInfo: accountData?.data.message,
    adminUserTableData: data?.data.message.data.map((item: any) => ({
      id: item.id,
      username: item.username,
      role: item.role,
    })),
    isLoading: !error && !data,
    isError: error,
    mutate,
    totalPage: Math.ceil(data?.data.message.total / amountUserPerPage),
    setPage,
  };
};

export default useAdminUser;
