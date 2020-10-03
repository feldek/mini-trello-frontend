import React, { useState } from "react";
import { Modal, Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../Data/UserReducer";

const ModalChangePasswordForm = ({ visible, onChange, onCancel, loading }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Change Password"
      okText="Change"
      cancelText="Cancel"
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onChange(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        layout="vertical"
        form={form}
        name="register"
        style={{ width: "100%" }}
        scrollToFirstError
        onFinish={onChange}
      >
        <Form.Item
          name="oldPassword"
          label="Old Password"
          rules={[
            {
              required: true,
              message: "Please input your old password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
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
                return Promise.reject("The two passwords that you entered do not match!");
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const СhangePassword = ({ visible, setVisible }) => {
  const userData = useSelector((s) => s.dataUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleRequest = (values) => {
    setLoading(true);
    dispatch(
      changePassword({
        email: userData.email,
        oldPassword: values.oldPassword,
        newPassword: values.password,
      })
    ).then((result) => {
      if (!result.error) setVisible(false);
      setLoading(false);
    });
  };

  return (
    <div>
      <ModalChangePasswordForm
        loading={loading}
        visible={visible}
        onChange={handleRequest}
        onCancel={(e) => {
          setVisible(false);
          e.stopPropagation();
        }}
      />
    </div>
  );
};

export default СhangePassword;
