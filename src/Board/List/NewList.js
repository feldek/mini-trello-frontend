import React from "react";
import { useDispatch } from "react-redux";
import { createList } from "../../Data/ListReducer";
import { createEmptyTask } from "../../Data/TaskReducer";
import { uuid } from "uuidv4";
import { useLocation, Link } from "react-router-dom";
import { Form, Input, Button, Radio } from "antd";
import s from "./NewList.module.css";

let NewList = () => {
  let boardId = useLocation().pathname.replace("/board/", "");
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const onFinish = (elem) => {
    let listId = uuid();
    dispatch(createEmptyTask(listId));
    dispatch(createList(elem.nameList, listId, boardId));
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks123"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={s.form}
    >
      <Form.Item
        name="nameList"
        rules={[
          {
            required: true,
            message: "Please input boardname!",
          },
        ]}
      >
        <label>
          Create new List
          <Input placeholder="Create new List" />
        </label>
      </Form.Item>

      <Form.Item layout="horizontal" style={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Link to="/">
          <Button
            htmlType="button"
            onClick={onReset}
            style={{ float: "right" }}
          >
            Back to board
          </Button>
        </Link>
      </Form.Item>
    </Form>
  );
};
export default NewList;
