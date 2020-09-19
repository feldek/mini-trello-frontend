import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import s from "./TasksCard.module.css";
import { deleteTask } from "../../../Data/TaskReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteIcon from "../../../ExtraComponents/DeleteIcon";
import ConfirmDelete from "../../../ExtraComponents/ConfirmDelete";

const Drag = ({ currentTask }) => {
  const dispatch = useDispatch();
  const [toggleDelete, setToggleDelete] = useState(false);
  const [taskId, setTaskId] = useState(false);
  const stateTask = useSelector((state) => state.tasks);
  const match = useRouteMatch();
  const grid = 7;
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    margin: `${grid + 1}px`,
    background: isDragging ? "#c2dcf7" : "#e1f0ff",
    ...draggableStyle,
  });

  const handleDelete = (el) => {
    setToggleDelete(true);
    setTaskId(el);
  };

  return (
    <>
      {currentTask.map((item, index) => (
        <div key={`task${item.id}`}>
          <div>
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                    snapshot.isDragging,
                    provided.draggableProps.style
                  )}
                  className={s.taskContainer}
                >
                  <DeleteIcon
                    size={"s"}
                    handleDelete={() => handleDelete(item.id)}
                  />
                  <Link
                    to={`${match.url}/description/${item.id}`}
                    className={s.taskText}
                  >
                    {item.name}
                  </Link>
                </div>
              )}
            </Draggable>
          </div>
        </div>
      ))}
      {toggleDelete && (
        <ConfirmDelete
          onConfirm={() => dispatch(deleteTask(stateTask, taskId))}
          setToggle={setToggleDelete}
        />
      )}
    </>
  );
};

export default Drag;
