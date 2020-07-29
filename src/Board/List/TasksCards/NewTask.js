import React from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../../Data/TaskReducer";
import { Form, Input, Button } from "antd";
import { deleteList } from "../../../Data/ListReducer";
import s from "./NewTask.module.css";

const NewTask = ({ uuid, listId }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const createNewTask = (elem) => {
    dispatch(createTask(elem[uuid], listId));
    onReset();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };
  const funcDeleteList = () => {
    dispatch(deleteList(listId));
  };

  return (
    <Form
      form={form}
      name="control-hooks"
      layout="vertical"
      onFinish={createNewTask}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name={uuid}
        rules={[
          {
            required: true,
            message: "Please input task name!",
          },
        ]}
      >
        <label>
          <Input placeholder="Create new Task" />
        </label>
      </Form.Item>
      <Form.Item style={{ marginBottom: "0" }}>
        <Button type="primary" htmlType="submit" className={s.button}>
          Add
        </Button>
        <Button
          className={s.button}
          danger
          htmlType="submit"
          style={{ float: "right" }}
          onClick={funcDeleteList}
        >
          Delete list
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewTask;
