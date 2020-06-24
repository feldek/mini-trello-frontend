import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import s from "./List.module.css";
import useLocalStorage from "local-storage-hook";

let List = ({ listId }) => {
  let boardId = useLocation().pathname.replace("/board/", "");
  let stateList = useSelector((state) => state.lists);
  let list = stateList
    .filter((elem) => elem.boardId === boardId)
    .find((elem) => elem.id === listId);
  const [localDataUserList, setLocalDataUserList] = useLocalStorage(
    "dataUserList",
    false
  );

  useEffect(() => {
    setLocalDataUserList(stateList);
  }, [stateList]);

  return (
    <div className={s.boxLists} key={`list${list.id}`}>
      {list && <div className={s.list}>{list.name}</div>}
    </div>
  );
};

export default List;
