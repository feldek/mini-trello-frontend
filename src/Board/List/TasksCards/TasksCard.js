import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { uuid } from "uuidv4";
import { useSelector, useDispatch } from "react-redux";
import NewList from "../NewList";
import List from "../List";
import { getTasks, stepOrder, updateTasks } from "../../../Data/TaskReducer";
import { useParams, Link } from "react-router-dom";
import NewTask from "./NewTask";
import PageNotFound from "../../../ExtraComponents/PageNotFound";
import { Card, Button, Spin } from "antd";
import "./TasksCard.css";
import "../../AntDesignStyle.css";
import Tasks from "./Tasks";
import s from "./TasksCard.module.css";
import { deleteList, getLists } from "../../../Data/ListReducer";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DeleteIcon from "../../../ExtraComponents/DeleteIcon";
import ConfirmDelete from "../../../ExtraComponents/ConfirmDelete";
import useSelection from "antd/lib/table/hooks/useSelection";

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

let TasksCard = () => {
  const params = useParams();
  const boardId = params.boardId;
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      await dispatch(getLists({ boardId: params.boardId }));
      await dispatch(getTasks({ boardId: params.boardId }));
    }
    fetchData();
  }, []);

  let [toggleDelete, setToggleDelete] = useState(false);
  let [listId, setListId] = useState(false);
  const isFetchingLists = useSelector((state) => state.lists.isFetching);
  const lists = useSelector((state) => state.lists.data);
  const currentLists = lists.filter((elem) => elem.boardId === boardId);

  let listsId = currentLists.map((el) => el.id);

  const tasks = useSelector((state) => state.tasks);

  let currentTasks = tasks.filter((item) => listsId.includes(item.listId));
  let dragState = [];
  listsId.map((item) =>
    dragState.push(currentTasks.filter((task) => task.listId === item))
  );
  currentTasks = dragState;

  const handleDelete = (el) => {
    setToggleDelete(true);
    setListId(el);
  };

  const handleDeleteList = async ({ listId }) => {
    await dispatch(deleteList({ listId }));
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
        order =
          newState[dInd].length === 1
            ? 0
            : newState[dInd][destination.index + 1].order - stepOrder;
      } else if (destination.index === newState[dInd].length - 1) {
        order = newState[dInd][destination.index - 1].order + stepOrder;
      } else {
        order =
          newState[dInd][destination.index - 1].order +
          (newState[dInd][destination.index + 1].order -
            newState[dInd][destination.index - 1].order) /
            2;
      }
      dListId = newState[sInd][0].listId;
      console.log(order);
    } else {
      const affectState = move(
        currentTasks[sInd],
        currentTasks[dInd],
        source,
        destination
      );
      const newState = [...currentTasks];
      newState[sInd] = affectState[sInd];
      dListId = currentLists[dInd].id;

      if (destination.index === 0) {
        order =
          newState[dInd].length === 0
            ? 0
            : newState[dInd][destination.index].order - stepOrder;
      } else if (destination.index === newState[dInd].length) {
        order = newState[dInd][destination.index - 1].order + stepOrder;
      } else {
        order =
          newState[dInd][destination.index - 1].order +
          (newState[dInd][destination.index].order -
            newState[dInd][destination.index - 1].order) /
            2;
      }
      console.log(order);
    }
    dispatch(updateTasks({ id: result.draggableId, order, listId: dListId }));
  }
  const classNames = require("classnames");
  return (
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
        <Spin tip="Loading..." style={{ width: "100%", height: "100px" }}></Spin>
      ) : (
        <Card className={classNames(`${s.totalCard}`, "totalCard")}>
          <DragDropContext onDragEnd={onDragEnd}>
            {currentLists.map(
              (el, ind) =>
                el.visibility && (
                  <Card.Grid key={`boxList${el.id}`} className={s.card}>
                    <Card
                      className={classNames(`${s.tasksHeader}`, "tasksHeader")}
                      key={`listone${el.id}`}
                      title={
                        // <div key={`headerCard${el.id}`}>
                        <div>
                          <List listId={el.id} />
                          <NewTask listId={el.id} uuid={uuid()} />
                        </div>
                      }
                    >
                      <Droppable droppableId={`${ind}`} key={`droppable${el.id}`}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={
                              (getListStyle(snapshot.isDraggingOver), { width: "100%" })
                            }
                            {...provided.droppableProps}
                          >
                            {<Tasks currentTask={currentTasks[ind]} />}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </Card>

                    <DeleteIcon
                      size={"l"}
                      handleDelete={() => handleDelete(el.id)}
                      styleParams={{ margin: "8px" }}
                    />
                  </Card.Grid>
                )
            )}

            <Card.Grid className={`${s.card} ${s.cardNewList}`}>
              <NewList />
            </Card.Grid>
          </DragDropContext>
        </Card>
      )}

      <ConfirmDelete
        onConfirm={() => handleDeleteList({ listId })}
        setVisible={setToggleDelete}
        visible={toggleDelete}
      />
    </div>
  );
};

export default TasksCard;
