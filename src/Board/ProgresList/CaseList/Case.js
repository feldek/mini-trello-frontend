import React, { useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { uuid } from "uuidv4";
import { useSelector, useDispatch } from "react-redux";
import NewList from "../NewList";
import ListInDND from "../List";
import { setCaseState, deleteCaseList } from "../../../Data/CaseReducer";
import { useLocation, useParams } from "react-router-dom";
import NewCase from "./NewCase";
import PageNotFound from "../../PageNotFound";
import s from "./Case.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import useLocalStorage from "local-storage-hook";

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
const grid = 10;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid,
  margin: `0 0 ${grid + 1}px 0`,
  background: isDragging ? "lightgreen" : "rgb(236, 233, 211)",
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "#ffffffd0",
  padding: grid,
  width: 220,
});

let Case = () => {
  const [localDataUserCase, setLocalDataUserCase] = useLocalStorage(
    "dataUserCase",
    false
  );
  const params = useParams();
  const dispatch = useDispatch();
  const listState = useSelector((state) => state.lists);
  const caseState = useSelector((state) => state.cases);
  const state = useSelector((state) => state.cases);
  const boardId = params.boardId;

  const stateList = useSelector((state) => state.lists);

  const listFilter = stateList
    ? stateList.filter((elem) => elem.boardId === boardId)
    : [];
  useEffect(() => {
    setLocalDataUserCase(state);
  }, [state]);

  if (
    !useSelector((state) => state.boards).find((elem) => elem.id === boardId)
  ) {
    return <PageNotFound />;
  }
  function onDragEnd(result) {
    // debugger
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      dispatch(setCaseState(newState));
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      let listId = result[dInd][result[dInd].length - 1].listId;
      newState[dInd] = result[dInd].map(
        (elem, ind) =>
          (elem =
            ind === destination.index
              ? { id: elem.id, name: elem.name, listId: listId }
              : elem)
      );

      // newState[dInd] = result[dInd];
      // console.log(destination.index);
      dispatch(setCaseState(newState.filter((group) => group.length)));
    }
  }

  return (
    <div className={s.content}>
      <NewList />
      <div className={s.lists}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state &&
            state.map((el, ind) => (
              <div key={`boxList${el[0].listId}`}>
                {el.length !== 0 &&
                  listFilter.find((elem) => elem.id === el[0].listId) && (
                    
                    <div key={`listone${el[0].listId}`}>
                      <div className={s.header} key={`header${el[0].listId}`}>
                        <ListInDND listId={el[0].listId} />
                        <NewCase index={ind} uuid={uuid()} />
                      </div>
                      <Droppable droppableId={`${ind}`} key={`droppable${el[0].listId}`}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                            className={s.cases}
                          >
                            {el.map((item, index) => (
                              <div key={`boxdragable${item.id}`}>
                                {item.name !== "" && (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        className={s.textCase}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                          snapshot.isDragging,
                                          provided.draggableProps.style
                                        )}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "start",
                                          }}
                                        >
                                          {item.name}
                                        </div>
                                        <button
                                          className={s.icon}
                                          type="button"
                                          onClick={() => {
                                            const newState = [...state];
                                            newState[ind].splice(index, 1);
                                            dispatch(
                                              setCaseState(
                                                newState.filter(
                                                  (group) => group.length
                                                )
                                              )
                                            );
                                          }}
                                        >
                                          <FontAwesomeIcon
                                            icon={faTimes}
                                            style={{ fontSize: "20px" }}
                                          />
                                        </button>
                                      </div>
                                    )}
                                  </Draggable>
                                )}
                              </div>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
              </div>
            ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Case;
