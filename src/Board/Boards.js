import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./Boards.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveActiveObject } from "../Data/BoardReducer";
import { getBoardList, getNumberBoard, getNameBoard } from "../Data/Selectors";
import NewBoard from "./NewBoard";

let Boards = () => {
  const dispatch = useDispatch();
  let nameBoards = [];
  let state = useSelector((state) => state);
  let boards = getBoardList(state);

  for (let numberBoards in boards) {
    nameBoards.push(
      <Link
        to={`/board${getNumberBoard(state, numberBoards)}`}
        className={s.box}
        key={getNumberBoard(state, numberBoards)}
        onClick={() => {
          dispatch(saveActiveObject(getNumberBoard(state, numberBoards)));
        }}
      >
        {getNameBoard(state, numberBoards)}
      </Link>
    );
  }
  // debugger
  return (
    <div>
      <NewBoard />
      {nameBoards}
    </div>
  );
};

export default Boards;
