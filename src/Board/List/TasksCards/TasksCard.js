import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { uuid } from "uuidv4";
import { useSelector, useDispatch } from "react-redux";
import NewList from "../NewList";
import List from "../List";
import { setTaskState, deleteTask } from "../../../Data/TaskReducer";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import NewTask from "./NewTask";
import PageNotFound from "../../PageNotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Card } from "antd";
import "./TasksCard.css";
import s from "./TasksCard.module.css";

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

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  margin: `${grid + 1}px`,
  background: isDragging ? "#c2dcf7" : "#e1f0ff",
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "#ffffffd0" : "#ffffffd0",
  padding: grid,
});

let TasksCards = () => {
  const params = useParams();
  const boardId = params.boardId;
  let match = useRouteMatch();

  const dispatch = useDispatch();
  const stateList = useSelector((state) => state.lists);

  const listsFilter = stateList.filter((elem) => elem.boardId === boardId);
  let listsId = listsFilter.map((el) => el.id);

  const stateTask = useSelector((state) => state.tasks);
  console.log(stateTask);
  let tasksFilter = stateTask.filter((item) => listsId.includes(item.listId));
  // let j=0;
  let dragState = [];
  // for(let i=0; i<listsId.length; i++){
  //   dragState[i].push(tasksFilter.filter(task=> task.listId===listsId[i]))
  // }
  listsId.map((item) =>
    dragState.push(tasksFilter.filter((task) => task.listId === item))
  );
  tasksFilter = dragState;

  if (
    !useSelector((state) => state.boards).find((elem) => elem.id === boardId)
  ) {
    return <PageNotFound />;
  }
  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(tasksFilter[sInd], source.index, destination.index);
      const newState = [...tasksFilter];
      newState[sInd] = items;
      let reducerState = [];
      newState.map((item) => reducerState.push(...item));
      // for(let i=0; i<newState.length; i++){
      //   test.push(...newState[i])
      // }
      // newState=newState.map(item=> )
      dispatch(setTaskState(reducerState));
    } else {
      const result = move(
        tasksFilter[sInd],
        tasksFilter[dInd],
        source,
        destination
      );
      const newState = [...tasksFilter];
      newState[sInd] = result[sInd];
      let listId = listsFilter[dInd].id;
      newState[dInd] = result[dInd].map(
        (elem, ind) =>
          (elem =
            ind === destination.index
              ? {
                  id: elem.id,
                  name: elem.name,
                  listId: listId,
                  description: elem.description,
                }
              : elem)
      );
      let reducerState = [];
      newState.map((item) => reducerState.push(...item));
      dispatch(setTaskState(reducerState));
    }
    // } else {
    //   const result = move(
    //     tasksFilter[sInd],
    //     tasksFilter[dInd],
    //     source,
    //     destination
    //   );
    //   const newState = [...tasksFilter];
    //   newState[sInd] = result[sInd];
    //   let listId = result[dInd][0].listId;
    //   newState[dInd] = result[dInd].map(
    //     (elem, ind) =>
    //       (elem =
    //         ind === destination.index
    //           ? {
    //               id: elem.id,
    //               name: elem.name,
    //               listId: listId,
    //               description: elem.description,
    //             }
    //           : elem)
    //   );
    //   dispatch(
    //     setTaskState(
    //       newState.filter((group) => group.length),
    //       listsId
    //     )
    //   );
    // }
  }

  return (
    <Card className={`${s.totalCard} totalCard`}>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* {tasksFilter.map((el, ind) => (           */}
        {listsFilter.map((el, ind) => (
          <Card.Grid key={`boxList${el.id}`} className={s.card}>
            <Card
              className={`${s.tasksHeader} tasksHeader`}
              key={`listone${el.id}`}
              title={
                <div key={`headerCard${el.id}`}>
                  <List listId={el.id} key={`lists${el.id}`} />
                  <NewTask
                    // stateTasks={tasksFilter}
                    // listsId={listsId}
                    listId={el.id}
                    uuid={uuid()}
                    key={`newTask${el.id}`}
                  />
                </div>
              }
            >
              <Droppable droppableId={`${ind}`} key={`droppable${el.id}`}>
                {(provided, snapshot) => (
                  <div
                    key={`tasks${el.id}`}
                    ref={provided.innerRef}
                    style={
                      (getListStyle(snapshot.isDraggingOver), { width: "100%" })
                    }
                    {...provided.droppableProps}
                  >
                    {tasksFilter[ind].map((item, index) => (
                      <div key={`task${item.id}`}>
                        {/* {item.name !== "" && (       */}

                        <div key={`boxdragable${item.id}`}>
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                key={`boxTask${item.id}`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                                className={s.taskContainer}
                              >
                                <button
                                  key={`buttons${item.id}`}
                                  className={s.buttonTaskDelete}
                                  type="button"
                                  onClick={() => {
                                    dispatch(deleteTask(item.id));
                                  }}
                                >
                                  <FontAwesomeIcon
                                    key={`icon${item.id}`}
                                    icon={faTimes}
                                    style={{
                                      fontSize: "28px",
                                      padding: "4px",
                                    }}
                                  />
                                </button>
                                <Link
                                  to={`${match.url}/description/${item.id}`}
                                  key={`content${item.id}`}
                                  className={s.taskText}
                                >
                                  {item.name}
                                </Link>
                              </div>
                            )}
                          </Draggable>
                        </div>
                        {/* )} */}
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          </Card.Grid>
        ))}

        <Card.Grid className={s.card}>
          <NewList />
        </Card.Grid>
      </DragDropContext>
    </Card>
  );
};

export default TasksCards;
