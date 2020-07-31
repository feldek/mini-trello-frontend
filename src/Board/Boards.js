import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewBoard from "./NewBoard";
import { deleteBoard } from "../Data/BoardReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Card } from "antd";
import s from "./Boards.module.css";
import "./Boards.css";
import ConfirmDelete from "./ExtraComponents/ConfirmDelete";

const Boards = () => {
  const dispatch = useDispatch();
  const [toggleDelete, setToggleDelete] = useState(false);
  const [param, setParam] = useState(false);
  const stateList = useSelector((state) => state.lists);

  const funcDeleteBoard = (item) => {
    let filterStateList = stateList
      .filter((el) => el.boardId === item.id)
      .map((el) => el.id);
    dispatch(deleteBoard(item.id, filterStateList));
  };

  const callConfirmDelete = (el) => {
    setToggleDelete(true);
    setParam(el);
  };

  return (
    <div className={`${s.content} boardsContent`}>
      <Card title={<NewBoard />}>
        <div className={s.boards}>
          {useSelector((state) => state.boards).map((elem) => (
            <Card.Grid key={`board${elem.id}`} className={s.board}>
              <button
                key={`boardButton${elem.id}`}
                className={s.button}
                data-title="delete"
                onClick={() => callConfirmDelete(elem)}
              >
                <FontAwesomeIcon icon={faTimes} style={{ fontSize: "20px" }} />
              </button>
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
          onConfirm={() => funcDeleteBoard(param)}
          setToggle={setToggleDelete}
        />
      )}
    </div>
  );
};

export default Boards;
