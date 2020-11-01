import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { uuid } from "uuidv4";

const FormToDoList1 = () => {
  const [boardId, setBoardId] = useState(uuid());
  const { register, control, handleSubmit, reset, trigger, setError, errors } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute
  });
  const { fields: lists, append: appendList, remove: removeList } = useFieldArray({
    control,
    name: "lists",
  });

  const { fields: tasks, append: appendTask, remove: removeTask } = useFieldArray({
    control,
    name: "tasks",
  });
  const collapseInput = {
    // visibility: "hidden",
    // width: "0",
    // margin: "0",
    // padding: "0",
    display: "none",
  };
  // lists = lists.map((itemList, indList) => {
  //   tasks = tasks.map((itemTask, indTask) => {
  //     (tasks[indTask].listId = itemList.id)((tasks[indTask].id = itemTask.id));
  //   });
  // });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        data.board = { name: data.board, id: boardId };
        console.log(data);
      })}
    >
      <input name="board" ref={register({ required: true })} />
      {errors.board && <span>This field is required</span>}
      <button type="button" onClick={() => appendList({ name: "list 1" })}>
        Create List
      </button>
      <ul>
        {lists.map((itemList, indList) => (
          <li key={itemList.id}>
            <input
              name={`lists[${indList}].name`}
              ref={register()}
              defaultValue={itemList.name}
            />
            <Controller
              style={collapseInput}
              as={<input />}
              name={`lists[${indList}].id`}
              control={control}
              defaultValue={itemList.id}
            />
            <button
              type="button"
              onClick={() => appendTask({ name: "task 1", listId: itemList.id })}
            >
              Create Task
            </button>

            <button type="button" onClick={() => removeList(indList)}>
              Delete
            </button>
            <ul>
              {tasks.map(
                (itemTask, indTask) =>
                  itemTask.listId === itemList.id && (
                    <li key={itemTask.id}>
                      <input
                        name={`tasks[${indTask}].list${indList}name`}
                        ref={register()}
                        defaultValue={itemTask.name}
                      />

                      <Controller
                        style={collapseInput}
                        as={<input />}
                        name={`tasks[${indTask}].id`}
                        control={control}
                        defaultValue={itemTask.id}
                      />
                      <Controller
                        style={collapseInput}
                        as={<input />}
                        name={`tasks[${indTask}].listId`}
                        control={control}
                        defaultValue={itemList.id}
                      />

                      {/* {(tasks[indTask].listId = itemList.id)}
                        {(tasks[indTask].id = itemTask.id)} */}
                      <button type="button" onClick={() => removeTask(indTask)}>
                        Delete
                      </button>
                    </li>
                  )
              )}
            </ul>
          </li>
        ))}
      </ul>

      <input type="submit" />
    </form>
  );
};
// export default FormToDoList1;
