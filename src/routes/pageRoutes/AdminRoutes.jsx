import { Navigate, Route, Routes } from "react-router-dom";
import { Auth, UnAuth } from "../validateAuth";
import { useAdminAuthStore } from "../../store/admin/useAuth";
import { Dashboard, Login } from "../../pages/admin";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={"/"} />} />

      <Route
        element={<UnAuth store={useAdminAuthStore} redirect={"/dashboard"} />}
      >
        <Route path="/" element={<Login />} />
      </Route>

      <Route element={<Auth store={useAdminAuthStore} redirect="/admin" />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
