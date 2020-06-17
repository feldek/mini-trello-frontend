import React from "react";
import { Link } from "react-router-dom";
import s from "./PageNotFound.module.css"


const PageNotFound = () => {

  return (
    <div className={s.style} >
      Page not found
      <Link to="/">
        <button className={s.button}>Back to board list</button>
      </Link>
    </div>
  );
};
export default PageNotFound;
