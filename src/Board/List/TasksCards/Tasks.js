import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import s from "./TasksCard.module.css";
import { deleteTask, onDeletedTask } from "../../../Data/TaskReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import DeleteIcon from "../../../ExtraComponents/DeleteIcon";
import ConfirmDelete from "../../../ExtraComponents/ConfirmDelete";

const Drag = ({ currentTask }) => {
  const dispatch = useDispatch();
  const [toggleDelete, setToggleDelete] = useState(false);
  const [taskId, setTaskId] = useState(false);
  const tasks = useSelector((state) => state.tasks);
  const match = useRouteMatch();
  const grid = 7;
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    margin: `${grid + 1}px`,
    background: isDragging ? "#c2dcf7" : "#e1f0ff",
    ...draggableStyle,
  });

  const handleConfirmDelete = (el) => {
    setToggleDelete(true);
    setTaskId(el);
  };

  const handleDelete = async () => {
    await dispatch(deleteTask({ id: taskId }));
  };
// debugger
  return (
    <>
      {currentTask.map(        
        (item, index) =>
          item.visibility && (
            <div key={`task${item.id}`}>
              {/* <div> */}
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
                        handleDelete={() => handleConfirmDelete(item.id)}
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
              {/* </div> */}
            </div>
          )
      )}
      <ConfirmDelete
        onConfirm={handleDelete}
        setVisible={setToggleDelete}
        visible={toggleDelete}
      />
    </>
  );
};

export default Drag;
