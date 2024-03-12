import { Button, Form, Input } from "antd";
import { loginBg, logo } from "../../assets/images";
import { useLoginApi } from "../../services/requests/admin/useLoginAuth";

const Login = () => {
  const [form] = Form.useForm();
  const { isLoading, mutate } = useLoginApi();

  const onFinish = (values) => {
    mutate(values);
  };

  form.setFieldsValue({
    username: "admin",
    password: "Tphr@2024!",
  });

  return (
    <div
      className=" w-full min-h-screen flex justify-center items-center relative"
      style={{
        background: `linear-gradient(#00000090, #000000), url(${loginBg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="py-10">
        <div className=" mb-5  sm:block w-[380px] bg-transparent sm:bg-white rounded-[5px] sm:p-[36px] z-10">
          <center>
            <img className="  w-[146px] h-[148px]" src={logo} />
            <div className=" text-3xl text-center text-white sm:text-black  font-normal  mb-3">
              ADMIN
            </div>
          </center>
          <div className="p-5 sm:p-0">
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              autoComplete="off"
              disabled={isLoading}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter username" />
              </Form.Item>

              <div className=" mb-5">
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password size="large" placeholder="Enter password" />
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  block
                  size="large"
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className=" text-center">
            <span className="text-neutral-300 sm:text-neutral-500 text-sm font-normal leading-[13.86px]">
              Don’t have an account?{" "}
            </span>
            <span className=" text-white sm:text-blue-800 text-sm font-normal  leading-[13.86px]">
              Sign Up!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
