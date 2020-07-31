import React from "react";

import s from "./ConfirmDelete.module.css";
import "./ConfirmDelete.css";
import { Form, Button } from "antd";
import { Link } from "react-router-dom";

const ConfirmDelete = ({ onConfirm, setToggle, linkToBack = "#" }) => {
  const [form] = Form.useForm();
  const handleConfirm = () => {
    onConfirm();
    setToggle(false);
  };

  return (
    <div className={s.background}>
      <div className={`${s.box} ConfirmDeleteBox`}>
        Сonfirm deletion?
        <Form form={form} name="control-hooks" layout="vertical">
          <Form.Item className={`${s.content} ConfirmDeleteContent`}>
            <Link to={linkToBack}>
              <Button
                htmlType="submit"
                className={s.button}
                danger
                onClick={handleConfirm}
              >
                Delete
              </Button>
            </Link>
            <Button
              htmlType="submit"
              className={s.button}
              onClick={() => setToggle(false)}
            >
              Back
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmDelete;
