import React, { useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import {
  Card, Form, Input, Button,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import classNames from 'classnames';
import s from './Description.module.css';
import PageNotFound from '../../../../ExtraComponents/PageNotFound';
import ConfirmDelete from '../../../../ExtraComponents/ConfirmDelete';
import { updateDescription } from '../../../../Redux/Task/TaskActions';

const ContainerDescription = () => {
  const id = useParams().descriptionId;
  const task = useSelector((state) => state.tasks.data).find((item) => item.id === id);
  const content = !task ? <PageNotFound /> : <Description task={task} id={id} />;
  return content;
};
export const Description = ({ task, id }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [removeClass, setRemoveClass] = useState(false);

  const { boardId } = useParams();
  const [toggle, setToggle] = useState(task.description !== '');
  const handleDelayRemove = () => {
    setRemoveClass(true);
    setTimeout(() => {
      setRemoveClass(false);
      history.push(`/board/${boardId}`);
    }, 200);
  };
  const handleUpdate = (elem) => {
    !toggle && dispatch(updateDescription({ description: elem.description, id }));
    !toggle && handleDelayRemove();
    toggle && setToggle(!toggle);
  };

  const [toggleDelete, setToggleDelete] = useState(false);

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const changeDescription = (
    <div key={`textArea${id}`}>
      <Form.Item name="description">
        <Input.TextArea
          className={s.textArea}
          autoSize
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

  const description = (
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

            <Button className={s.button} onClick={handleDelayRemove}>
              Back
            </Button>
          </div>
        </div>
      </Form.Item>
    </div>
  );

  return (
    <div className={s.background} key={`container${id}`} onClick={handleDelayRemove}>
      <div onClick={(e) => e.stopPropagation()} className={s.stopPropagation}>
        <div className={classNames(s.boxModal, { [s.remove]: removeClass })}>
          <Card title={<div>{task.name}</div>} className={s.card}>
            <div>
              <Form
                form={form}
                name="control-hooks"
                layout="vertical"
                onFinish={handleUpdate}
                onFinishFailed={onFinishFailed}
                className={s.form}
                fields={[
                  {
                    name: ['description'],
                    value: task.description,
                  },
                ]}
              >
                <div>{toggle ? description : changeDescription}</div>
              </Form>
            </div>
          </Card>
        </div>
        <ConfirmDelete
          onConfirm={() => dispatch(updateDescription({ description: '', id }))}
          setVisible={setToggleDelete}
          visible={toggleDelete}
          linkToBack={`/board/${boardId}`}
        />
      </div>
    </div>
  );
};

export default ContainerDescription;
