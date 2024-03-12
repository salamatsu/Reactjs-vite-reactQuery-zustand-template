import { Button, Modal } from "antd";
import { useAdminAuthStore } from "../../../store/admin/useAuth";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;
const Dashboard = () => {
  const { reset } = useAdminAuthStore();

  const handleLogout = () => {
    confirm({
      title: "LOGOUT",
      icon: <ExclamationCircleFilled />,
      content: "CONFIRMATION message",
      okText: "CONFIRM",
      okButtonProps: {
        danger: true,
      },
      onOk() {
        reset();
      },
    });
  };

  return (
    <>
      <div className=" flex flex-row justify-between p-3">
        <h3>Dashboard</h3>
        <Button onClick={handleLogout} danger>
          LOGOUT
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
