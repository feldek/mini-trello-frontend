import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import s from '../Cards.module.css';
import DeleteIcon from '../../../ExtraComponents/DeleteIcon';
import ConfirmDelete from '../../../ExtraComponents/ConfirmDelete/ConfirmDelete';
import { deleteTask } from '../../../Redux/Task/TaskActions';

const Drag = ({ currentTask }) => {
  const dispatch = useDispatch();
  const [toggleDelete, setToggleDelete] = useState(false);
  const [taskId, setTaskId] = useState(false);
  const match = useRouteMatch();
  const grid = 7;
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    margin: `${grid + 1}px`,
    background: isDragging ? '#c2dcf7' : '#e1f0ff',
    ...draggableStyle,
  });

  const handleConfirmDelete = (el) => {
    setToggleDelete(true);
    setTaskId(el);
  };

  const handleDelete = async () => {
    await dispatch(deleteTask({ id: taskId }));
  };

  return (
    <>
      {currentTask.map(
        (item, index) => item.visibility && (
        <div key={`task${item.id}`}>
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
              <div
                key={`task123${item.id}`}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style,
                )}
                className={s.taskContainer}
              >
                <DeleteIcon
                  size="s"
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
        </div>
        ),
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
