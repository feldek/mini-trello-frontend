import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import s from "./ProgressLists.module.css";
import NewList from "./NewList";

let ListInDND = ({ ind }) => {
  let boardId = useLocation().pathname.replace("/board/", "");
  let listObjects = useSelector((state) => state.lists).filter(
    (elem) => elem.boardId === boardId
  );

  return (
    <div className={s.boxLists}>
      {
        <div className={s.list} key={listObjects[ind].id}>
          {listObjects[ind].name}
        </div>
      }
      {/* <NewList /> */}
    </div>
  );
};

export default ListInDND;
