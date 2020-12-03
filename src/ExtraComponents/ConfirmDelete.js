import React, { useEffect, useRef, useState } from "react";
import s from "./ConfirmDelete.module.css";
import "./ConfirmDelete.css";
import { Form, Button } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames";

const ConfirmDelete = ({
  onConfirm,
  setVisible,
  visible = false,
  linkToBack = "#",
  phrase = "deletion",
  phraseButton = "Delete",
}) => {
  const [removeClass, setRemoveClass] = useState(false);
  const isMounted = useRef(true);
  const handleConfirm = () => {
    setRemoveClass(true);
    setTimeout(() => {
      setRemoveClass(false);
      onConfirm();
      if (isMounted.current) {
        setVisible(false);
      }
    }, 200);
  };
  const handleBack = () => {
    setRemoveClass(true);
    setTimeout(() => {
      setRemoveClass(false);
      if (isMounted.current) {
        setVisible(false);
      }
    }, 200);
  };
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      {visible && (
        <div className={s.background}>
          <div
            className={classNames(s.box, "ConfirmDeleteBox", { [s.remove]: removeClass })}
          >
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
