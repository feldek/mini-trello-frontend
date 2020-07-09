import React from "react";
import { Link } from "react-router-dom";
import { Button, Descriptions } from "antd";
import s from "./PageNotFound.module.css";

const PageNotFound = ({ style }) => {
  return (
    <div className={s.style} style={style}>
      <div className={s.box}>
        Page not found
        <Link to="/">
          <Button className={s.button}>Back to board list</Button>
        </Link>
      </div>
    </div>
  );
};
export default PageNotFound;
