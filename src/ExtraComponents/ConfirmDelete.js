import React, { useState } from "react";
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
  const [removeClass, setRemoveClass] = useState(null);
  const classNames = require("classnames");
  const handleConfirm = () => {
    setRemoveClass(s.remove);
    setTimeout(() => {
      setRemoveClass(null);
      onConfirm();
      setVisible(false);
    }, 300);
  };
  const handleBack = (e) => {
    e.stopPropagation();
    setRemoveClass(s.remove);
    setTimeout(() => {
      setRemoveClass(null);
      setVisible(false);
    }, 300);
  };

  return (
    <>
      {visible && (
        <div className={s.background}>
          <div className={classNames(s.box, "ConfirmDeleteBox", removeClass)}>
            Сonfirm {phrase}?
            <div className={s.contentBox}>
              <Form.Item className={classNames(s.content, "ConfirmDeleteContent")}>
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
                <Button htmlType="submit" className={s.button} onClick={handleBack}>
                  Back
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmDelete;
