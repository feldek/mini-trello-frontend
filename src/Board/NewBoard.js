import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBoard,
  createdBoard,
  deleteBoard,
  deletedBoard,
} from "../Data/BoardReducer";
import { Form, Input, Button } from "antd";
import "antd/dist/antd.css";
import s from "./NewBoard.module.css";
import "./NewBoard.css";
import { uuid } from "uuidv4";

let NewBoard = ({ boards }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [toggle, setToggle] = useState(false);
  const lists = useSelector((state) => state.lists);
  const handleCreate = async (elem) => {
    let id = uuid();
    let listsId = lists.filter((el) => el.boardId === elem.id).map((el) => el.id);
    onReset();
    dispatch(createBoard({ name: elem.nameBoard, id, listsId }));
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
        <Button value="large" className={s.createAntd} onClick={() => setToggle(true)}>
          Create new board
        </Button>
      )}
      {toggle && (
        <Form
          form={form}
          name="newBoardForm"
          layout="vertical"
          onFinish={handleCreate}
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

          <Form.Item className={`${s.buttons} NewBoardButtons`}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="submit" onClick={() => setToggle(false)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default NewBoard;
