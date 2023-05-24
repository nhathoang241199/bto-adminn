import { getBlackList } from "../services/blackList";
import { useState } from "react";
import useSWR from "swr";
import { rankArray } from "./usePortalUser";
const amountUserPerPage = 10;

const useBlackList = () => {
  const [page, setPage] = useState(1);
  const { data, error, mutate } = useSWR(
    { key: "getBlackList", page, userPerPage: amountUserPerPage },
    getBlackList,
  );
  console.log("data?.data.message.data2: ", data?.data.message.data);

  return {
    blackListTableData: data?.data.message.data.map((item: any) => ({
      id: item.id,
      active: item.active,
      affCode: item.affCode,
      username: item.username,
      email: item.email,
      rank: rankArray[item.level],
      registered: new Date(item.createdAt).toLocaleString("en-US"),
    })),
    isLoading: !error && !data,
    isError: error,
    mutate,
    totalPage: Math.ceil(data?.data.message.total / amountUserPerPage),
    setPage,
  };
};

export default useBlackList;
