import API from "../api";

export const handleLogin = async (username: string, password: string) =>
  API.post("api/v1/auth/admin/login", {
    username,
    password,
  });
