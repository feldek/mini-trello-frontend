import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./Boards.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewBoard from "./NewBoard";
import { deleteBoard } from "../Data/BoardReducer";
import useLocalStorage from "local-storage-hook";
import { deleteListsBoard } from "../Data/ListReducer";
import { deleteCaseBoard } from "../Data/CaseReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

let Boards = (props) => {
  const dispatch = useDispatch();
  const stateBoard = useSelector((state) => state.boards);
  const [localDataUserBoard, setLocalDataUserBoard] = useLocalStorage(
    "dataUserBoard",
    false
  );
  const [localDataUserList, setLocalDataUserList] = useLocalStorage(
    "dataUserList"
  );
  const [localDataUserCase, setLocalDataUserCase] = useLocalStorage(
    "dataUserCase"
  );
  const stateList = useSelector((state) => state.lists);
  const stateCase = useSelector((state) => state.cases);
  useEffect(() => {
    setLocalDataUserBoard(stateBoard);
  }, [stateBoard]);
  useEffect(() => {
    setLocalDataUserList(stateList);
  }, [stateList]);
  useEffect(() => {
    setLocalDataUserCase(stateCase);
  }, [stateCase]);
  return (
    <div className={s.content}>
      <NewBoard />
      <div className={s.boards}>
        {useSelector((state) => state.boards).map((elem) => (
          <div key={`boardBox${elem.id}`} className={s.box}>
            <button
              key={`boardButton${elem.id}`}
              className={s.button}
              onClick={() => (
                dispatch(deleteBoard(elem.id)),
                dispatch(deleteListsBoard(elem.id)),
                stateList
                  .filter((el) => el.boardId === elem.id)
                  .forEach((element) => {
                    dispatch(deleteCaseBoard(element.id));
                  })
              )}
            >
              <FontAwesomeIcon icon={faTimes} style={{ fontSize: "20px" }} />
            </button>
            <Link
              to={`/board/${elem.id}`}
              key={`board${elem.id}`}
              className={s.board}
            >
              {elem.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boards;
