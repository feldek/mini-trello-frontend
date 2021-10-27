import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Spin } from "antd";
import classNames from "classnames";

import s from "./Boards.module.css";
import "./Boards.css";

import { RootStateType } from "../../Redux/Store";
import NewBoard from "./NewBoard/NewBoard";
import DeleteIcon from "../../ExtraComponents/DeleteIcon";
import ConfirmDelete from "../../ExtraComponents/ConfirmDelete/ConfirmDelete";
import Header from "./Header/Header";
import { deleteBoard, getBoards } from "../../Redux/Board/BoardActions";

const Boards = (): JSX.Element => {
  const dispatch = useDispatch();
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [boardId, setBoardId] = useState<string>("");
  const boards = useSelector((state: RootStateType) => state.boards.data);
  const isFetching = useSelector((state: RootStateType) => state.boards.isFetching);

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteBoard({ boardId: id }));
  };
  const onConfirmDelete = (id: string) => {
    setVisibleDelete(true);
    setBoardId(id);
  };

  return (
    <div className={s.background}>
      <div className={classNames(s.content, "boardsContent")}>
        <Header />
        <Card title={<NewBoard />}>
          {isFetching ? (
            <Spin tip="Loading..." style={{ width: "100%", height: "100px" }}></Spin>
          ) : (
            <div className={s.boards}>
              {boards.map(
                (elem) =>
                  elem.visibility && (
                    <Card.Grid key={`board${elem.id}`} className={s.board}>
                      <DeleteIcon size="m" handleDelete={() => onConfirmDelete(elem.id)} />
                      <Link
                        to={`/board/${elem.id}`}
                        key={`board${elem.id}`}
                        className={s.boardLink}
                      >
                        {elem.name}
                      </Link>
                    </Card.Grid>
                  ),
              )}
            </div>
          )}
        </Card>
        <ConfirmDelete
          onConfirm={() => handleDelete(boardId)}
          setVisible={setVisibleDelete}
          visible={visibleDelete}
        />
      </div>
    </div>
  );
};

export default Boards;
