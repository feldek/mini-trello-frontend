import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewBoard from "./NewBoard";
import { getBoards, deleteBoard } from "../Data/BoardReducer";
import { Alert, Card, Spin } from "antd";
import s from "./Boards.module.css";
import "./Boards.css";
import DeleteIcon from "../ExtraComponents/DeleteIcon";
import ConfirmDelete from "../ExtraComponents/ConfirmDelete";
import Header from "./Header";
import { boardsSelect } from "../Data/Selectors";

const Boards = () => {
  const dispatch = useDispatch();
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [param, setParam] = useState(false);
  const stateBoard = useSelector((state) => boardsSelect(state));
  // const stateBoard = useSelector((state) => state.board);
  const classNames = require("classnames");
  const [isFetchingBoards, setFetchingBoards] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setFetchingBoards(true);
      await dispatch(getBoards());
      setFetchingBoards(false);
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
    <div className={classNames(`${s.content}`, "boardsContent")}>
      <Header />
      <Card title={<NewBoard boards={stateBoard} />}>
        {isFetchingBoards ? (
          <Spin tip="Loading..." style={{ width: "100%", height: "100px" }}></Spin>
        ) : (
          <div className={s.boards}>
            {stateBoard.map(
              (elem) =>
                elem.visibility && (
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
  );
};

export default Boards;
