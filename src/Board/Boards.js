import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewBoard from "./NewBoard";
import { deletedBoard, deleteBoardLocal, getBoards } from "../Data/BoardReducer";
import { Alert, Card, Spin } from "antd";
import s from "./Boards.module.css";
import "./Boards.css";
import DeleteIcon from "../ExtraComponents/DeleteIcon";
import ConfirmDelete from "../ExtraComponents/ConfirmDelete";
import Header from "./Header";

const Boards = () => {
  const dispatch = useDispatch();
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [param, setParam] = useState(false);
  // const [hidden, setHidden] = useState([]);
  let [idDisabled, setIdDisabled] = useState();
  const stateBoard = useSelector((state) => state.boards);
  const stateList = useSelector((state) => state.lists);
  const stateTask = useSelector((state) => state.tasks);
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
    setIdDisabled(item.id);
    let listsId = stateList.filter((el) => el.boardId === item.id).map((el) => el.id);
    await dispatch(deletedBoard({ boardId: item.id, listsId }));
    setIdDisabled();
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
              (elem) => (
                // !hidden.includes(elem.name) && (
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
              )
              // )
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
