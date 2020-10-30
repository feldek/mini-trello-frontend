import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import s from "./SignIn.module.css";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { recoveryPassword } from "../Data/Actions/UserAction";
import { useHistory } from "react-router-dom";

const RecoveryPassword = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleAuthorization = async (values) => {
    setLoading(true);
    const result = await dispatch(recoveryPassword({ email: values.email }));
    setLoading(false);
    if (result.status) {
      history.push("/");
    }
  };

  return (
    <div className={`${s.background} background`}>
      <div className={s.box}>
        Input you email
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
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Send
            </Button>
          </Form.Item>
          An email will be sent to you with instruction
        </Form>
      </div>
    </div>
  );
};

export default RecoveryPassword;
