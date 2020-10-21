import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewBoard from "./NewBoard";
import { Card, Spin } from "antd";
import s from "./Boards.module.css";
import "./Boards.css";
import DeleteIcon from "../ExtraComponents/DeleteIcon";
import ConfirmDelete from "../ExtraComponents/ConfirmDelete";
import Header from "./Header";
import {
  deleteBoard,
  getBoards,
  onSetIsFenchingBoards,
} from "../Data/Actions/BoardActions";

const Boards = () => {
  const dispatch = useDispatch();
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [param, setParam] = useState(false);
  const boards = useSelector((state) => state.boards.data);
  const isFetching = useSelector((state) => state.boards.isFetching);
  const classNames = require("classnames");

  useEffect(() => {
    async function fetchData() {
      await dispatch(getBoards());
    }
    fetchData();
  }, []);

  const handleDelete = async (item) => {
    await dispatch(deleteBoard({ boardId: item.id }));
  };

  const callConfirmDelete = (el) => {
    setVisibleDelete(true);
    setParam(el);
  };

  return (
    <div className={s.background}>
      <div className={classNames(`${s.content}`, "boardsContent")}>
        <Header />
        <Card title={<NewBoard boards={boards} />}>
          {isFetching ? (
            <Spin tip="Loading..." style={{ width: "100%", height: "100px" }}></Spin>
          ) : (
            <div className={s.boards}>
              {boards.map(
                (elem) =>
                  elem.visibility && (
                    <Card.Grid key={`board${elem.id}`} className={s.board}>
                      <DeleteIcon
                        size={"m"}
                        handleDelete={() => callConfirmDelete(elem)}
                      />
                      <Link
                        to={`/board/${elem.id}`}
                        key={`board${elem.id}`}
                        className={s.boardLink}
                      >
                        {elem.name}
                      </Link>
                    </Card.Grid>
                  )
              )}
            </div>
          )}
        </Card>
        <ConfirmDelete
          onConfirm={() => handleDelete(param)}
          setVisible={setVisibleDelete}
          visible={visibleDelete}
        />
      </div>
    </div>
  );
};

export default Boards;
