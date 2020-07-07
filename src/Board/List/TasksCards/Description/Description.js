import React, { useState, useEffect } from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import { Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, Radio } from "antd";
import {
  createDescription,
  deleteDescription,
} from "../../../../Data/DescriptionReducer";
import s from "./Description.module.css";
import useLocalStorage from "local-storage-hook";

let Description = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const stateDescription = useSelector((state) => state.descriptions);
  const [
    localDataUserDescription,
    setLocalDataUserDescription,
  ] = useLocalStorage("dataUserDescription");
  useEffect(() => {
    setLocalDataUserDescription(stateDescription);
  }, [stateDescription]);
  

  let taskId = useParams().descriptionId;
  let boardId = useParams().boardId;

  let title = useSelector((state) => state.tasks)
    .find((el) => el.find((item) => item.id === taskId))
    .find((item) => item.id === taskId);

  let description = useSelector((state) => state.descriptions);
  description = !description ? [] : description;

  let textDescription = description.find((el) => el.taskId === taskId);
  textDescription = !textDescription ? "" : textDescription.name;

  let [toggle, setToggle] = useState(textDescription !== "");

  const onFinish = (elem) => {
    !toggle && dispatch(createDescription(`${elem.description}`, taskId));
    setToggle(!toggle);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  let textArea = (
    <div key={`textArea${taskId}`}>
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
    <div key={`textArea${taskId}`}>
      <Form.Item
        onDoubleClick={() => setToggle(false)}
        className={s.textDescription}
      >
        {textDescription !== "undefined" ? textDescription : ""}
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
            onClick={() => dispatch(deleteDescription(taskId))}
            style={{ float: "right", margin: "0px 4px" }}
          >
            Delete
          </Button>
        </Link>
      </Form.Item>
    </div>
  );

  return (
    <div className={s.background}>
      <Link to={`/board/${boardId}`} className={s.linkToBoard}></Link>

      <div className={s.container}>
        <Card title={<div>{title.name}</div>} className={s.card}>
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
                  value: textDescription !== "undefined" ? textDescription : "",
                },
              ]}
            >
              <div>{toggle ? descriptionText : textArea}</div>
              {/* <div>{descriptionText}</div>
              <div>{textArea}</div>
              <div>{`${toggle}`}</div> */}
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Description;
