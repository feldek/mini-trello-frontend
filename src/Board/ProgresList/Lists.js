import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useLocation,
} from "react-router-dom";
import s from "./ProgressLists.module.css";
import NewList from "./NewList";

let Lists = () => {
  let boardId = useLocation().pathname.replace("/board/", "");
  let listObjects = useSelector((state) => state.lists).filter(
    (elem) => elem.boardId === boardId
  );

  return (
    <div className={s.boxLists}>
        {listObjects.map(elem=> 
        <div className={s.list} key={elem.id}>
          {elem.name}          
        </div>
          )}
      {/* <NewList /> */}
    </div>
  );
};

export default Lists;
