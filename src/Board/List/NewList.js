import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createList } from "../../Data/ListReducer";
import { uuid } from "uuidv4";
import { useLocation, Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import s from "./NewList.module.css";

let NewList = () => {
  let [toggle, setToggle] = useState(false);
  let boardId = useLocation().pathname.replace("/board/", "");
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = (elem) => {
    let id = uuid();
    dispatch(createList(elem.nameList, id, boardId));
    setToggle(false);
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
          <Form.Item layout="vertical">
            <Link to="/">
              <Button htmlType="button" className={s.formButton}>
                Back to board
              </Button>
            </Link>
          </Form.Item>
        </div>
      )}

      {toggle && (
        <Form
          layout="vertical"
          form={form}
          name="control-hooks123"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className={s.formInput}
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

          <Form.Item layout="horizontal">
            <Button type="primary" htmlType="submit" style={{ float: "left" }}>
              Submit
            </Button>

            <Button
              style={{ float: "right" }}
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
