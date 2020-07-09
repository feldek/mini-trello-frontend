import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import {
  createDescription,
  deleteDescription,
} from "../../../../Data/TaskReducer";
import s from "./Description.module.css";
import PageNotFound from "../../../PageNotFound";

export let ContainerDescription = () => {
  let id = useParams().descriptionId;
  let tasks = useSelector((state) => state.tasks).find((el) =>
    el.find((item) => item.id === id)
  );
  let content = !tasks ? <PageNotFound /> : <Description tasks={tasks} />;
  return content;
};

let Description = ({ tasks }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  let id = useParams().descriptionId;
  let boardId = useParams().boardId;
  let task = tasks.find((item) => item.id === id);
  let [toggle, setToggle] = useState(task.description !== "");

  const onFinish = (elem) => {
    !toggle && dispatch(createDescription(`${elem.description}`, id));
    setToggle(!toggle);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let textArea = (
    <div key={`textArea${id}`}>
      <Form.Item name="description">
        <Input.TextArea
          className={s.textArea}
          autoSize={true}
          placeholder="Create new Description"
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: "0" }}>
        <Button type="primary" htmlType="submit">
          Confirm
        </Button>
        <Link to={`/board/${boardId}`}>
          <Button style={{ float: "right" }}>Back to board</Button>
        </Link>
        <Button
          type="link"
          htmlType="button"
          onClick={onReset}
          style={{ float: "right" }}
        >
          Reset
        </Button>
      </Form.Item>
    </div>
  );

  let descriptionText = (
    <div key={`descriptionText${id}`}>
      <Form.Item
        onDoubleClick={() => setToggle(false)}
        className={s.textDescription}
      >
        {task.description}
      </Form.Item>
      <Form.Item style={{ marginBottom: "0" }}>
        <Button type="primary" htmlType="submit">
          Edit
        </Button>
        <Link to={`/board/${boardId}`}>
          <Button style={{ float: "right" }}>Back to board</Button>

          <Button
            danger
            htmlType="button"
            onClick={() => dispatch(deleteDescription(id, task.listId))}
            style={{ float: "right", margin: "0px 4px" }}
          >
            Delete
          </Button>
        </Link>
      </Form.Item>
    </div>
  );

  return (
    <div className={s.background} key={`container${id}`}>
      <Link to={`/board/${boardId}`} className={s.linkToBoard}></Link>
      <div className={s.container}>
        <Card title={<div>{task.name}</div>} className={s.card}>
          <div>
            <Form
              form={form}
              name="control-hooks"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className={s.form}
              fields={[
                {
                  name: ["description"],
                  value: task.description,
                },
              ]}
            >
              <div>{toggle ? descriptionText : textArea}</div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Description;
