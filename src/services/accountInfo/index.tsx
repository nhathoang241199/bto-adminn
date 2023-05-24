import API from "../api";

export const callGetAccountInfo = async () => {
  const userToken = localStorage.getItem("user_token");

  return await API.get("api/v1/auth/admin/auth", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};
