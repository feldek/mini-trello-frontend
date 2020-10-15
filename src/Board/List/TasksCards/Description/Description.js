import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button } from "antd";
import { createDescription, deleteDescription } from "../../../../Data/TaskReducer";
import s from "./Description.module.css";
import PageNotFound from "../../../../ExtraComponents/PageNotFound";
import ConfirmDelete from "../../../../ExtraComponents/ConfirmDelete";

let ContainerDescription = () => {
  let id = useParams().descriptionId;
  let task = useSelector((state) => state.tasks).find((item) => item.id === id);
  let content = !task ? <PageNotFound /> : <Description task={task} id={id} />;
  return content;
};
export let Description = ({ task, id }) => {
  let history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const stateTask = useSelector((state) => state.tasks);

  let boardId = useParams().boardId;
  let [toggle, setToggle] = useState(task.description !== "");

  const handleCreate = (elem) => {
    !toggle && dispatch(createDescription(stateTask, elem.description, id));
    !toggle && history.push(`/board/${boardId}`);
    toggle && setToggle(!toggle);
  };

  let [toggleDelete, setToggleDelete] = useState(false);

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

      <Form.Item>
        <div className={s.buttonsContainer}>
          <Button type="primary" htmlType="submit" className={s.button}>
            Confirm
          </Button>
          <div>
            <Button className={s.button} type="link" htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Link to={`/board/${boardId}`}>
              <Button className={s.button}>Back</Button>
            </Link>
          </div>
        </div>
      </Form.Item>
    </div>
  );

  let descriptionText = (
    <div key={`descriptionText${id}`}>
      <Form.Item onClick={() => setToggle(false)} className={s.textDescription}>
        {task.description}
      </Form.Item>

      <Form.Item>
        <div className={s.buttonsContainer}>
          <Button type="primary" htmlType="submit">
            Edit
          </Button>

          <div>
            <Button danger htmlType="button" onClick={() => setToggleDelete(true)}>
              Delete
            </Button>

            <Link to={`/board/${boardId}`}>
              <Button className={s.button}>Back</Button>
            </Link>
          </div>
        </div>
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
              onFinish={handleCreate}
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
      <ConfirmDelete
        onConfirm={() => dispatch(deleteDescription(stateTask, id))}
        setVisible={setToggleDelete}
        visible={toggleDelete}
        linkToBack={`/board/${boardId}`}
      />
    </div>
  );
};

export default ContainerDescription;
