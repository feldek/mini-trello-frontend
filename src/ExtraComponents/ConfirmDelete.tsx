import React, { useState } from "react";
import s from "./ConfirmDelete.module.css";
import "./ConfirmDelete.css";
import { Form, Button } from "antd";
import { Link } from "react-router-dom";
import classNames from "classnames";

type Props = {
  onConfirm: () => void;
  setVisible: (visible: boolean) => void;
  visible: boolean;
  linkToBack?: string;
  phrase?: string;
  phraseButton?: string;
};

const ConfirmDelete: React.FC<Props> = ({
  onConfirm,
  setVisible,
  visible = false,
  linkToBack = "#",
  phrase = "deletion",
  phraseButton = "Delete",
}) => {
  const [removeClass, setRemoveClass] = useState<boolean>(false);

  const handleConfirm = () => {
    setRemoveClass(true);
    setTimeout(() => {
      setRemoveClass(false);
      setVisible(false);
      onConfirm();
    }, 200);
  };
  const handleBack = () => {
    setRemoveClass(true);
    setTimeout(() => {
      setRemoveClass(false);
      setVisible(false);
    }, 200);
  };

  return (
    <div>
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
    </div>
  );
};

export default ConfirmDelete;
