import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewBoard from "./NewBoard";
import { deleteBoard } from "../Data/BoardReducer";
import { Card } from "antd";
import s from "./Boards.module.css";
import "./Boards.css";
import DeleteIcon from "../ExtraComponents/DeleteIcon";
import ConfirmDelete from "../ExtraComponents/ConfirmDelete";
import Header from "./Header";

const Boards = () => {
  const dispatch = useDispatch();
  const [toggleDelete, setToggleDelete] = useState(false);
  const [param, setParam] = useState(false);
  const stateList = useSelector((state) => state.lists);
  const stateBoard = useSelector((state) => state.boards);
  const stateTask = useSelector((state) => state.tasks);

  const handleDelete = (item) => {
    let filterStateList = stateList
      .filter((el) => el.boardId === item.id)
      .map((el) => el.id);
    dispatch(deleteBoard(stateBoard, item.id, filterStateList, stateList, stateTask));
  };

  const callConfirmDelete = (el) => {
    setToggleDelete(true);
    setParam(el);
  };

  const classNames = require("classnames");

  return (
    <div className={classNames(`${s.content}`, "boardsContent")}>
      <Header />
      <Card title={<NewBoard />}>
        <div className={s.boards}>
          {useSelector((state) => state.boards).map((elem) => (
            <Card.Grid key={`board${elem.id}`} className={s.board}>
              <DeleteIcon size={"m"} handleDelete={() => callConfirmDelete(elem)} />
              <Link
                to={`/board/${elem.id}`}
                key={`board${elem.id}`}
                className={s.boardLink}
              >
                {elem.name}
              </Link>
            </Card.Grid>
          ))}
        </div>
      </Card>
      {toggleDelete && (
        <ConfirmDelete
          onConfirm={() => handleDelete(param)}
          setToggle={setToggleDelete}
        />
      )}
    </div>
  );
};

export default Boards;
