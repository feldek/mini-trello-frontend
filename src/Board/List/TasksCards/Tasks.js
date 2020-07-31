import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import s from "./TasksCard.module.css";
import { deleteTask } from "../../../Data/TaskReducer";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useRouteMatch } from "react-router-dom";
import ConfirmDelete from "../../ExtraComponents/ConfirmDelete";

const Drag = ({ listTask }) => {
  const dispatch = useDispatch();
  const [toggleDelete, setToggleDelete] = useState(false);
  const [taskId, setTaskId] = useState(false);
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
      {listTask.map((item, index) => (
        <div key={`task${item.id}`}>
          <div key={`boxdragable${item.id}`}>
            <Draggable key={item.id} draggableId={item.id} index={index}>
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
                    onClick={() => handleDelete(item.id)}
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
        </div>
      ))}
      {toggleDelete && (
        <ConfirmDelete
          onConfirm={() => dispatch(deleteTask(taskId))}
          setToggle={setToggleDelete}
        />
      )}
    </>
  );
};

export default Drag;
