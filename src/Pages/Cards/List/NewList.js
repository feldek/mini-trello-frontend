import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import s from './NewList.module.css';
import { createList } from '../../../Redux/List/ListActions';

const NewList = () => {
  const [toggle, setToggle] = useState(false);
  const boardId = useLocation().pathname.replace('/board/', '');
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleCreate = async (elem) => {
    setToggle(false);
    await dispatch(createList({ name: elem.nameList, boardId }));
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {!toggle && (
        <div className={s.form}>
          <Form.Item layout="vertical">
            <Button
              type="primary"
              htmlType="button"
              onClick={() => setToggle(true)}
              className={s.formButton}
            >
              Create new List
            </Button>
          </Form.Item>
        </div>
      )}

      {toggle && (
        <Form
          layout="vertical"
          form={form}
          name="control-hooks123"
          onFinish={handleCreate}
          onFinishFailed={onFinishFailed}
          className={s.formInput}
        >
          <Form.Item
            name="nameList"
            rules={[
              {
                required: true,
                message: 'Please input boardname!',
              },
            ]}
          >
            <label>
              Create new List
              <Input placeholder="Create new List" />
            </label>
          </Form.Item>

          <Form.Item layout="horizontal">
            <Button type="primary" htmlType="submit" style={{ float: 'left' }}>
              Submit
            </Button>

            <Button
              style={{ float: 'right' }}
              htmlType="button"
              onClick={() => setToggle(false)}
            >
              Back
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
export default NewList;
