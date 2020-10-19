import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import s from "./SignIn.module.css";
import "./SignIn.css";
import { useDispatch } from "react-redux";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signIn } from "../Data/Actions/UserAction";

const SignIn = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAuthorization = async (values) => {
    setLoading(true);
    await dispatch(signIn({ email: values.email, password: values.password }));    
    setLoading(false);
  };

  return (
    <div className={`${s.background} background`}>
      <div className={s.box}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleAuthorization}
        >
          <Form.Item
            name="email"
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
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Sign in
            </Button>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Link to="/authorization/signup">Or register now!</Link>
            <Link className="login-form-forgot" to="/authorization/forgotPassword">
              Forgot password
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
