import { axiosAuth } from "../../axios";

export const loginApi = async (payload) => {
  return await axiosAuth.post("/api/v1/cms/auth/login", payload);
};
