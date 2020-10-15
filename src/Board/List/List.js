import React from "react";
import {  useSelector } from "react-redux";
import {  useRouteMatch } from "react-router-dom";
import s from "./List.module.css";

let List = ({ listId }) => {
  let boardId = useRouteMatch().params.boardId;
  let stateList = useSelector((state) => state.lists);
  let list = stateList
    .filter((elem) => elem.boardId === boardId)
    .find((elem) => elem.id === listId);

  return (
    <div className={s.boxLists} key={`list${list.id}`}>
      <div className={s.list}>{list.name}</div>
    </div>
  );
};

export default List;
