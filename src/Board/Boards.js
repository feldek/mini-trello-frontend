import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./Boards.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveActiveObject } from "../Data/BoardReducer";

let Boards = () => {
  let boards = useSelector((state) => state.board).listBoard;
  const dispatch = useDispatch();
  let nameBoards = [];
  for (let elem in boards) {
    nameBoards.push(
      <Link
        to={`/board${boards[elem].id}`}
        className={s.box}
        key={boards[elem].id}
        onClick={
          ()=>{
            dispatch(saveActiveObject(boards[elem].id))
          }
        }
      >
        {boards[elem].nameBoard}
      </Link>
    );
  }
return <div>{nameBoards}</div>;
};

export default Boards;
