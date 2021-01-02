import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { recoveryPassword } from '../Reducers/Actions/UserAction';
import s from './SignIn.module.css';

const RecoveryPassword = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleAuthorization = async (values) => {
    setLoading(true);
    const result = await dispatch(
      recoveryPassword({ email: values.email, password: values.password }),
    );
    setLoading(false);
    if (result.status) {
      history.push('/');
    }
  };

  return (
    <div className={`${s.background} background`}>
      <div className={s.box}>
        Input you email
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleAuthorization}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
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
            label="New Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm New Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    'The two passwords that you entered do not match!',
                  );
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
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
