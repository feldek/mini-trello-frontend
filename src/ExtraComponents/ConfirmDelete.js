import React, { useEffect, useState } from "react";
import s from "./ConfirmDelete.module.css";
import "./ConfirmDelete.css";
import { Form, Button } from "antd";
import { Link } from "react-router-dom";

const ConfirmDelete = ({
  onConfirm,
  setVisible,
  visible = false,
  linkToBack = "#",
  phrase = "deletion",
  phraseButton = "Delete",
}) => {
  const [form] = Form.useForm();
  const handleConfirm = () => {
    onConfirm();
    setVisible(false);
  };

  return (
    <>
      {visible && (
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
                    setVisible(false);
                    e.stopPropagation();
                  }}
                >
                  Back
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmDelete;
