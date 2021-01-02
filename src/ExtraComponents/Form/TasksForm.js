import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { Controller, ErrorMessage, useFieldArray } from 'react-hook-form';
import ConfirmDelete from '../ConfirmDelete';
import s from './ArrayForm.module.css';

const TasksForm = ({
  register, control, errors, setValue, listInd,
}) => {
  const { fields: tasks, append: appendTask, remove: removeTask } = useFieldArray({
    control,
    name: `lists[${listInd}].tasks`,
  });

  const [descriptionId, setDescriptionId] = useState([]);
  const handleDeleteDescription = ({ id, index }) => {
    setValue(`lists[${listInd}].tasks[${index}].description`, '');
    const result = descriptionId.filter((el) => el !== id);
    setDescriptionId([...result]);
  };

  const [toggleDelete, setToggleDelete] = useState(false);
  const [functionConfirm, setFunctionConfirm] = useState();

  const handleDelete = (func) => {
    setFunctionConfirm(() => func);
    setToggleDelete(true);
  };

  return (
    <>
      {tasks.map((item, index) => {
        const showDescription = descriptionId.includes(item.id);

        return (
          <div key={item.id} className={s.containerTask}>
            <div className={s.inputTask}>
              <div className={s.inputAndError}>
                <input
                  className={s.input}
                  placeholder="Task Name"
                  name={`lists[${listInd}].tasks[${index}].name`}
                  ref={register({ required: true })}
                  defaultValue=""
                />
                <ErrorMessage
                  errors={errors}
                  name={`lists[${listInd}].tasks[${index}].name`}
                  message={<span>This field must be required</span>}
                />
              </div>

              {!showDescription ? (
                <Button
                  htmlType="button"
                  style={{ marginLeft: '5px' }}
                  onClick={() => setDescriptionId([...descriptionId, item.id])}
                >
                  Add Description
                </Button>
              ) : (
                <Button
                  danger
                  className="deleteDescription"
                  htmlType="button"
                  style={{
                    marginLeft: '5px',
                  }}
                  onClick={() => handleDelete(() => handleDeleteDescription({ id: item.id, index }))}
                >
                  Delete Description
                </Button>
              )}

              <Button
                danger
                htmlType="button"
                style={{ marginLeft: '5px' }}
                onClick={() => handleDelete(() => removeTask(index))}
              >
                Delete
              </Button>
            </div>
            {showDescription && (
              <Controller
                as={(
                  <Input.TextArea
                    autoSize
                    placeholder="Create new Description"
                    className="texstArea"
                  />
                )}
                name={`lists[${listInd}].tasks[${index}].description`}
                control={control}
                defaultValue=""
              />
            )}
          </div>
        );
      })}
      <Button
        htmlType="button"
        onClick={() => {
          appendTask();
        }}
      >
        Create Task
      </Button>

      <ConfirmDelete
        onConfirm={() => functionConfirm()}
        setVisible={setToggleDelete}
        visible={toggleDelete}
      />
    </>
  );
};

export default TasksForm;
