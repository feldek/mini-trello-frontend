import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { uuid } from 'uuidv4';
import { Button } from 'antd';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import TasksForm from './TasksForm';
import s from './ArrayForm.module.css';
import './ArrayForm.css';
import { createTasks, stepOrder } from '../../Redux/Task/TaskActions';
import ConfirmDelete from '../ConfirmDelete/ConfirmDelete';
import { createLists } from '../../Redux/List/ListActions';
import { createBoard } from '../../Redux/Board/BoardActions';
import DeleteIcon from '../DeleteIcon';

const ArrayForm = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const {
    register, control, handleSubmit, errors, setValue, getValues,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  });
  const { fields: lists, append: appendList, remove: removeList } = useFieldArray({
    control,
    name: 'lists',
  });
  const [indDelete, setIndDelete] = useState();
  const [toggleDelete, setToggleDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [removeClass, setRemoveClass] = useState(false);
  const handleDelayRemove = () => {
    setRemoveClass(true);
    setTimeout(() => {
      setRemoveClass(false);
      setVisible(false);
    }, 200);
  };
  const handleSend = async (data) => {
    data.board = { name: data.board, id: uuid() };
    if (!data.lists) {
      data.lists = [];
    }
    data.tasks = [];

    data.lists = data.lists.map((el) => {
      el.id = uuid();
      el.boardId = data.board.id;
      if (!el.tasks) {
        return el;
      }
      let previousOrder = 0;
      const tasksThisList = el.tasks.map((item) => {
        if (!item.description) {
          item.description = '';
        }
        item.id = uuid();
        item.listId = el.id;
        item.order = previousOrder;
        previousOrder += stepOrder;
        return item;
      });
      data.tasks.push(...tasksThisList);
      delete el.tasks;

      return el;
    });
    setLoading(true);
    const boardResult = await dispatch(
      createBoard({ id: data.board.id, name: data.board.name }),
    );
    if (boardResult.status) {
      const listsResult = await dispatch(createLists(data.lists));
      if (listsResult.status) {
        dispatch(createTasks(data.tasks));
      }
    }
    setLoading(false);
    handleDelayRemove();
    console.log(data);
  };
  const handleDelete = (index) => {
    setIndDelete(index);
    setToggleDelete(true);
  };

  return (
    visible && (
      <div className={s.background} onClick={handleDelayRemove}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={classNames(s.stopPropagation, { [s.remove]: removeClass })}
        >
          <div className={s.boxModal}>
            <form onSubmit={handleSubmit(handleSend)} className={s.form}>
              <div className={s.boardBox}>
                <div className={s.descriptionThis}>
                  Here you can enter all data at once
                </div>
                <div className={s.boardName}>Input Board Name</div>
                <div className={s.inputAndError}>
                  <input
                    className={s.input}
                    placeholder="Board Name"
                    name="board"
                    ref={register({
                      required: { value: true, message: 'This field must be required' },
                    })}
                    defaultValue=""
                  />
                  {errors.board && <span>{errors.board.message}</span>}
                </div>
              </div>

              {lists.map((list, index) => (
                <div key={list.id} className={s.lists}>
                  <div className={s.listName}>Input List Name</div>
                  <div className={s.inputListBox}>
                    <div className={s.inputAndError}>
                      <input
                        className={s.input}
                        placeholder="List Name"
                        name={`lists[${index}].name`}
                        ref={register({
                          required: {
                            value: true,
                            message: 'This field must be required',
                          },
                        })}
                        defaultValue=""
                      />
                      {errors.lists && errors.lists[index] && (
                      <span>{errors.lists[index].name.message}</span>
                      )}
                    </div>

                    <Button
                      danger
                      style={{ marginLeft: '5px' }}
                      htmlType="button"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </div>

                  <TasksForm
                    listInd={index}
                    register={register}
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                  />
                </div>
              ))}
              <div className={s.footerButtons}>
                <Button
                  htmlType="button"
                  className={s.createList}
                  onClick={() => {
                    appendList();
                  }}
                >
                  Create List
                </Button>

                <div className={s.boxSubmit}>
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    className={s.submit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <ConfirmDelete
            onConfirm={() => removeList(indDelete)}
            setVisible={setToggleDelete}
            visible={toggleDelete}
          />

          <DeleteIcon
            size="l"
            handleDelete={handleDelayRemove}
            styleParams={{ top: '10px', right: '10px' }}
          />
        </div>
      </div>
    )
  );
};
export default ArrayForm;
