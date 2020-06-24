import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTaskState, deleteTaskList } from "../../../Data/TaskReducer";
import { Form, Input, Button, Radio } from "antd";
import s from "./NewTask.module.css";
import { deleteList } from "../../../Data/ListReducer";

const NewTask = ({ index, uuid }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const listState = useSelector((state) => state.lists);
  const state = useSelector((state) => state.tasks);

  const onFinish = (elem) => {
    dispatch(
      setTaskState(
        state.map((elemState, elemStateInd) => {
          if (elemStateInd === index)
            return [
              ...elemState,
              {
                id: uuid,
                name: elem[uuid],
                listId: listState[index].id,
              },
            ];
          else return [...elemState];
        })
      )
    );
    onReset();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };
  return (
    <Form
      form={form}
      name="control-hooks"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name={uuid}
        rules={[
          {
            required: true,
            message: "Please input boardname!",
          },
        ]}
      >
        <label>
          <Input placeholder="Create new Task" />
        </label>
      </Form.Item>
      <Form.Item style={{ marginBottom: "0" }}>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
        <Button
          danger
          htmlType="submit"
          style={{ float: "right" }}
          onClick={() => (
            dispatch(deleteList(index)), dispatch(deleteTaskList(index))
          )}
        >
          Delete list
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewTask;
