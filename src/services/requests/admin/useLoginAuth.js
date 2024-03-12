import { message } from "antd";
import { loginApi } from "../../api/admin/auth";
import { useMutation } from "@tanstack/react-query";
import { useAdminAuthStore } from "../../../store/admin/useAuth";

export const useLoginApi = () => {
  const { setuserData, setToken } = useAdminAuthStore();

  return useMutation({
    mutationFn: loginApi,
    onSuccess: ({ data }) => {
      setuserData(data?.data);
      setToken(data.token);
    },
    onError: (error) => {
      message.warning(
        error?.response?.data?.message ||
          "Login failed. Please check your connection or contact support."
      );
    },
  });
};
