import React from "react";
import s from "./ConfirmDelete.module.css";
import "./ConfirmDelete.css";
import { Form, Button } from "antd";
import { Link } from "react-router-dom";

const ConfirmDelete = ({
  onConfirm,
  setToggle,
  linkToBack = "#",
  phrase = "deletion",
  phraseButton = "Delete",
}) => {
  const [form] = Form.useForm();
  const handleConfirm = () => {
    onConfirm();
    setToggle(false);
  };

  return (
    <div className={s.background}>
      <div className={`${s.box} ConfirmDeleteBox`}>
        Сonfirm {phrase}?
        <Form form={form} name="control-hooks" layout="vertical">
          <Form.Item className={`${s.content} ConfirmDeleteContent`}>
            <Link to={linkToBack}>
              <Button
                htmlType="submit"
                className={s.button}
                danger
                onClick={handleConfirm}
              >
                {phraseButton}
              </Button>
            </Link>
            <Button
              htmlType="submit"
              className={s.button}
              onClick={(e) => {
                setToggle(false);
                e.stopPropagation();
              }}
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
