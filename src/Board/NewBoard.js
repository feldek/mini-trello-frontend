import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uuid } from "uuidv4";
import { createBoard } from "../Data/BoardReducer";
import { Form, Input, Button, Radio } from "antd";
import "antd/dist/antd.css";
import s from "./NewBoard.module.css";

let NewBoard = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [toggle, setToggle] = useState(false);
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      span: 16,
    },
  };

  const onFinish = (elem) => {
    dispatch(createBoard(elem.nameBoard, uuid()));
    onReset();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      {!toggle && (
        <Button
          value="large"
          className={s.createAntd}
          style={{ marginBottom: "28px" }}
          onClick={() => setToggle(true)}
        >
          Create new board
        </Button>
      )}
      {toggle && (
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className={s.form}
        >
          <Form.Item
            name="nameBoard"
            rules={[
              {
                required: true,
                message: "Please input boardname!",
              },
            ]}
          >
            <label>
              Create new board
              <Input placeholder="input boardname" />
            </label>
          </Form.Item>

          <Form.Item {...tailLayout} className={s.buttons}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="link" htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button
              htmlType="submit"
              onClick={() => setToggle(false)}
              style={{ float: "right" }}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default NewBoard;
