import { handleLogin } from "../services/auth";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  TUpdateAccount,
  handleCreateUser,
  handleUpdateUser,
  TCreateAccount,
} from "../services/adminUser";
import {
  TBanUser,
  TChangeUserPassword,
  callBanUser,
  callChangeUserPassword,
} from "../services/portalUser";
import { callUnbanUser } from "../services/blackList";
import {
  callApproveWithdraw,
  callRejectWithdraw,
} from "../services/withdrawRequest";
import { mutate } from "swr";
import {
  TSetProfitPercent,
  callSetProfitPercent,
} from "../services/dailyProfit";
import { callCreateWallet } from "../services/adminWallet";

const useApi = () => {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const res = await handleLogin(username, password);

      const { success, message } = res.data;
      if (success) {
        const userToken = message.token;
        localStorage.setItem("user_token", userToken);
        await router.push("/");
        toast.closeAll();
        toast({
          title: "Login Successful!",
          description: "Your account is already logged in.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast.closeAll();
      toast({
        title: "Fail Login!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const createUser = async (data: TCreateAccount) => {
    setLoading(true);
    try {
      const res = await handleCreateUser(data);

      const { success, message } = res.data;
      if (success) {
        toast.closeAll();
        toast({
          title: "Create user successful!",
          description: "Your account have been created",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast.closeAll();
      toast({
        title: "Create user fail!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const updateUser = async (data: TUpdateAccount) => {
    setLoading(true);
    try {
      const res = await handleUpdateUser(data);

      const { success, message } = res.data;
      if (success) {
        toast.closeAll();
        toast({
          title: "Update user successful!",
          description: "Your account have been changed",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast.closeAll();
      toast({
        title: "Update user fail!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const changeUserPassword = async (data: TChangeUserPassword) => {
    setLoading(true);
    try {
      const res = await callChangeUserPassword(data);

      const { success, message } = res.data;
      if (success) {
        toast.closeAll();
        toast({
          title: "Change password successful!",
          description: "Account have been changed password",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast.closeAll();
      toast({
        title: "Change password fail!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const banUser = async (data: TBanUser) => {
    setLoading(true);
    try {
      const res = await callBanUser(data);

      const { success, message } = res.data;
      if (success) {
        toast.closeAll();
        toast({
          title: "Ban user successful!",
          description: "User have been banned",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast.closeAll();
      toast({
        title: "Ban user fail!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const unbanUser = async (userId: string) => {
    setLoading(true);
    try {
      const res = await callUnbanUser(userId);

      const { success, message } = res.data;
      if (success) {
        toast.closeAll();
        toast({
          title: "Unban user successful!",
          description: "User have been Unbanned",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast.closeAll();
      toast({
        title: "Unban user fail!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  const rejectWithdraw = async (requestId: string) => {
    setLoading(true);
    try {
      const res = await callRejectWithdraw(requestId);

      const { success, message } = res.data;
      if (success) {
        toast.closeAll();
        toast({
          title: "Reject request successful!",
          description: "Request have been rejected",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast.closeAll();
      toast({
        title: "Reject request fail!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setLoading(false);
  };
  const setProfitPercent = async (data: TSetProfitPercent) => {
    setLoading(true);
    try {
      const res = await callSetProfitPercent(data);

      const { success, message } = res.data;
      if (success) {
        toast.closeAll();
        toast({
          title: "Set profit percent successful!",
          description: "You have set profit percent successful",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast.closeAll();
      toast({
        title: "Set profit percent fail!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const aprroveWithdraw = async (
    requestId: string,
    fromAdminWallet: string,
  ) => {
    setLoading(true);
    try {
      const res = await callApproveWithdraw({ requestId, fromAdminWallet });

      const { success, message } = res.data;
      if (success) {
        toast.closeAll();
        toast({
          title: "Approve request successful!",
          description: "Request have been Approved",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast.closeAll();
      toast({
        title: "Approve request fail!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    setLoading(false);
  };
  const createWallet = async (role: string) => {
    setLoading(true);
    try {
      const res = await callCreateWallet(role);

      const { success } = res.data;
      if (success) {
        toast.closeAll();
        toast({
          title: "Create wallet successful!",
          description: "Wallet have been created",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setLoading(false);
        return true;
      }
    } catch (error: any) {
      toast.closeAll();
      toast({
        title: "Create wallet fail!",
        description: error.response.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
      return false;
    }
  };

  return {
    login,
    loading,
    createUser,
    updateUser,
    changeUserPassword,
    banUser,
    unbanUser,
    rejectWithdraw,
    aprroveWithdraw,
    setProfitPercent,
    createWallet,
  };
};

export default useApi;
