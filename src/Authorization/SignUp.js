import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import s from "./SignUp.module.css";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { signUp } from "../Data/UserReducer";

const SignUp = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const handleRequest = async (values) => {
    setDisabled(true);
    await dispatch(signUp({ email: values.email, password: values.password }));
    setDisabled(false);
  };

  return (
    <div className={s.background}>
      <div className={s.box}>
        <div>Registration</div>
        <Form
          layout="vertical"
          form={form}
          name="register"
          onFinish={handleRequest}
          style={{ width: "100%" }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={disabled}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
