import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Spin } from "antd";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";


import "./TasksCard.css";
import "../../AntDesignStyle.css";
import s from "./TasksCard.module.css";

import { getTasks, stepOrder, updateTask } from "../../../Redux/Task/TaskActions";
import { deleteListSaga, getListsSaga } from "../../../Redux/List/ListSagas";
import PageNotFound from "../../../ExtraComponents/PageNotFound";
import ConfirmDelete from "../../../ExtraComponents/ConfirmDelete";
import Lists from "./Lists";



const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};
const grid = 7;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#ffffffd0" : "#ffffffd0",
  padding: grid,
});

const TasksCard = () => {
  const params = useParams();
  const { boardId } = params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListsSaga({ boardId: params.boardId }));
    dispatch(getTasks({ boardId: params.boardId }));
  }, [dispatch, params]);

  const [toggleDelete, setToggleDelete] = useState(false);
  const [listId, setListId] = useState(false);
  const isFetchingLists = useSelector((state) => state.lists.isFetching);
  const currentLists = useSelector((state) => state.lists.data).filter((elem) => elem.boardId === boardId);
  const listsId = currentLists.map((el) => el.id);
  const tasks = useSelector((state) => state.tasks.data);
  let currentTasks = tasks.filter((item) => listsId.includes(item.listId));

  const dragState = [];
  listsId.map((item) => dragState.push(currentTasks.filter((task) => task.listId === item)));
  currentTasks = dragState;

  const handleDelete = (el) => {
    setToggleDelete(true);
    setListId(el);
  };

  const handleDeleteList = async ({ listId }) => {
    await dispatch(deleteListSaga({ listId }));
  };

  if (!useSelector((state) => state.boards.data).find((elem) => elem.id === boardId)) {
    return <PageNotFound />;
  }
  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;
    let order;
    let dListId;
    if (sInd === dInd) {
      const items = reorder(currentTasks[sInd], source.index, destination.index);
      const newState = [...currentTasks];
      newState[sInd] = items;

      if (destination.index === 0) {
        order = newState[dInd].length === 1 ? 0 : newState[dInd][destination.index + 1].order - stepOrder;
      } else if (destination.index === newState[dInd].length - 1) {
        order = newState[dInd][destination.index - 1].order + stepOrder;
      } else {
        order =
          newState[dInd][destination.index - 1].order +
          (newState[dInd][destination.index + 1].order - newState[dInd][destination.index - 1].order) / 2;
      }
      dListId = newState[sInd][0].listId;
    } else {
      const affectState = move(currentTasks[sInd], currentTasks[dInd], source, destination);
      const newState = [...currentTasks];
      newState[sInd] = affectState[sInd];
      dListId = currentLists[dInd].id;

      if (destination.index === 0) {
        order = newState[dInd].length === 0 ? 0 : newState[dInd][destination.index].order - stepOrder;
      } else if (destination.index === newState[dInd].length) {
        order = newState[dInd][destination.index - 1].order + stepOrder;
      } else {
        order =
          newState[dInd][destination.index - 1].order +
          (newState[dInd][destination.index].order - newState[dInd][destination.index - 1].order) / 2;
      }
    }
    dispatch(updateTask({ id: result.draggableId, order, listId: dListId }));
  }
  return (
    <div className={s.background}>
      <div className={s.content}>
        <Link to="/">
          <Button htmlType="button" className={s.backButton}>
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              style={{
                fontSize: "31px",
                padding: "4px",
              }}
            />
            Back
          </Button>
        </Link>
        {isFetchingLists ? (
          <div className={s.containerSpin}>
            <Spin tip="Loading..." style={{ width: "100%", height: "100px" }} />
          </div>
        ) : (
          <Card className={classNames(`${s.totalCard}`, "totalCard")}>
            <Lists
              onDragEnd={onDragEnd}
              currentLists={currentLists}
              currentTasks={currentTasks}
              getListStyle={getListStyle}
              handleDelete={handleDelete}
            />
          </Card>
        )}

        <ConfirmDelete
          onConfirm={() => handleDeleteList({ listId })}
          setVisible={setToggleDelete}
          visible={toggleDelete}
        />
      </div>
    </div>
  );
};

export default TasksCard;
