import React from "react";
import { useDispatch } from "react-redux";
import { setTaskState } from "../../../Data/TaskReducer";
import { Form, Input, Button } from "antd";
import { deleteList } from "../../../Data/ListReducer";
import s from "./NewTask.module.css";

const NewTask = ({ uuid, listId, listsId, stateTasks }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (elem) => {
    dispatch(
      setTaskState(
        stateTasks.map((elemState) => {
          if (listId === elemState[0].listId)
            return [
              ...elemState,
              {
                id: uuid,
                name: elem[uuid],
                listId: listId,
                description: "",
              },
            ];
          else return [...elemState];
        }),
        listsId
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
          onClick={() =>
            dispatch(
              deleteList(
                listId,
                stateTasks
                  .find((el) => el[0].listId === listId)
                  .map((item) => item.id)
              )
            )
          }
        >
          Delete list
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewTask;
