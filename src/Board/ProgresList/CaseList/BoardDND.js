import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { uuid } from "uuidv4";
import { useSelector } from "react-redux";
import Lists from "../Lists";
import NewList from "../NewList";
import ListInDND from "../ListInDND";

// fake data generator

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    name: `item ${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
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
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

let BoardDND = () => {
  const listState = useSelector((state) => state.lists);
  const [count, setCount] = useState(1);
  const { handleSubmit, register, errors, reset } = useForm();
  const caseState = useSelector((state) => state.cases);

  const [state, setState] = useState(caseState, []);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button>
      <NewList />
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <div key={ind}>
              <ListInDND ind={ind}/>
              <form
                onSubmit={handleSubmit((elem) => {
                  setState(
                    state.map((elemState, elemStateInd) => {
                      if (elemStateInd === ind)
                        return [
                          ...elemState,
                          {
                            id: uuid(),
                            name: elem[`nameList${listState[ind].id}`],
                            listId: listState[ind].id,
                          },
                        ];
                      else return [...elemState];
                    })
                  );
                })}
              >
                <input name={`nameList${listState[ind].id}`} ref={register()} />
                {errors.nameList && errors.nameList.message}
                <button type="submit">Add</button>
              </form>

              <Droppable droppableId={`${ind}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    {...provided.droppableProps}
                  >
                    {el.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
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
                                justifyContent: "space-around",
                              }}
                            >
                              {item.name}
                              <button
                                type="button"
                                onClick={() => {
                                  const newState = [...state];
                                  newState[ind].splice(index, 1);
                                  setState(
                                    newState.filter((group) => group.length)
                                  );
                                }}
                              >
                                delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default BoardDND;
