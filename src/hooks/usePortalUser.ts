import { getPortalUser } from "../services/portalUser";
import { useState } from "react";
import useSWR from "swr";
const amountUserPerPage = 7;

export const rankArray = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];

const usePortalUser = () => {
  const [page, setPage] = useState(1);
  const [searchUserName, setSearchUserName] = useState("");
  const [active, setActive] = useState(true);
  const { data, error, mutate } = useSWR(
    {
      key: "getPortalUser",
      page,
      userPerPage: amountUserPerPage,
      searchUserName,
      active,
    },
    getPortalUser,
  );
  return {
    portalUserTableData: data?.data.message.data.map((item: any) => ({
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
    setSearchUserName,
    setActive,
  };
};

export default usePortalUser;
