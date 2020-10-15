import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewBoard from "./NewBoard";
import { deleteBoard, getBoards } from "../Data/BoardReducer";
import { Card } from "antd";
import s from "./Boards.module.css";
import "./Boards.css";
import DeleteIcon from "../ExtraComponents/DeleteIcon";
import ConfirmDelete from "../ExtraComponents/ConfirmDelete";
import Header from "./Header";

const Boards = () => {
  const dispatch = useDispatch();
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [param, setParam] = useState(false);
  let [idDisabled, setIdDisabled] = useState();
  const stateBoard = useSelector((state) => state.boards);
  const stateList = useSelector((state) => state.lists);
  const stateTask = useSelector((state) => state.tasks);
  const classNames = require("classnames");

  useEffect(() => {
    async function fetchData() {
      await dispatch(getBoards());
    }
    fetchData();
  }, []);

  const handleDelete = async (item) => {
    setIdDisabled(item.id);
    let filterStateList = stateList
      .filter((el) => el.boardId === item.id)
      .map((el) => el.id);
    await dispatch(
      deleteBoard(stateBoard, {
        boardId: item.id,
        filterStateList,
        stateList,
        stateTask,
      })
    );
    setIdDisabled();
  };

  const callConfirmDelete = (el) => {
    setVisibleDelete(true);
    setParam(el);
  };

  return (
    <div className={classNames(`${s.content}`, "boardsContent")}>
      <Header />
      <Card title={<NewBoard />}>
        <div className={s.boards}>
          {useSelector((state) => state.boards).map((elem) => (
            <Card.Grid key={`board${elem.id}`} className={s.board}>
              <DeleteIcon
                size={"m"}
                handleDelete={() => callConfirmDelete(elem)}
                id={elem.id}
                idDisabled={idDisabled}
              />
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
      <ConfirmDelete
        onConfirm={() => handleDelete(param)}
        setVisible={setVisibleDelete}
        visible={visibleDelete}
      />
    </div>
  );
};

export default Boards;
