import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewBoard from "./NewBoard";
import { deleteBoard } from "../Data/BoardReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Card } from "antd";
import s from "./Boards.module.css";

let Boards = () => {
  const dispatch = useDispatch();
  const stateList = useSelector((state) => state.lists);
  const funcDeleteBoard = (item) => {
    let filterStateList = stateList
      .filter((el) => el.boardId === item.id)
      .map((el) => el.id);
    dispatch(deleteBoard(item.id, filterStateList));
  };

  return (
    <div className={s.content}>
      <Card title={<NewBoard />}>
        <div className={s.boards}>
          {useSelector((state) => state.boards).map((elem) => (
            <Card.Grid key={`board${elem.id}`} className={s.board}>
              <button
                key={`boardButton${elem.id}`}
                className={s.button}
                data-title="delete"
                onClick={() => funcDeleteBoard(elem)}
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
    </div>
  );
};

export default Boards;
