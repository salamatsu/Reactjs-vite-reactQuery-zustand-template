import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AdminRoutes from "./pageRoutes/AdminRoutes";

const RootRoutes = () => {
  const router = createBrowserRouter([
    { path: "/admin/*", Component: AdminRoutes },
    { path: "/*", Component: AdminRoutes },
  ]);

  return <RouterProvider router={router} />;
};

export default RootRoutes;
