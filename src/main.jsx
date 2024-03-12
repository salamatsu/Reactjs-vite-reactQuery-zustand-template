import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#CC0011",
            colorWarning: "#E2B93B",
            colorSuccess: "#27AE60",
            colorSecondary: "#636363",
            colorError: "#EB5757",
            colorInfo: "#2F80ED",
            fontFamily: "Outfit, sans-serif",
            colorBgBase: "#fff",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
