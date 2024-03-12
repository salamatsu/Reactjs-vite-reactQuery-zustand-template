import { message } from "antd";
import axios from "axios";
import { useAdminAuthStore } from "../store/admin/useAuth";
import { useUserAuthStore } from "../store/user/useAuth";

export const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const getUsersValues = {
  admin: "ADMIN",
  user: "USER",
};

export const getUserToken = (user = getUsersValues.user) => {
  if (user === getUsersValues.admin) {
    return useAdminAuthStore.getState();
  } else {
    return useUserAuthStore.getState();
  }
};

export const createAxiosInstanceWithInterceptor = (type = "data", user) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };

  if (type === "data") {
    headers["Content-Type"] = "application/json";
  } else {
    headers["content-type"] = "multipart/form-data";
  }

  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers,
  });

  instance.interceptors.request.use(async (config) => {
    try {
      const { token } = getUserToken(user);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        throw new Error("Authorization token not found.");
      }
    } catch (error) {
      console.error({ error });
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      const { reset } = getUserToken(user);
      const errMessage = error.response?.data;
      if (errMessage?.message === "Invalid token." || errMessage?.code == 300) {
        message.warning(
          "Unable to process transaction. You have to login again."
        );
        reset();
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return instance;
};
