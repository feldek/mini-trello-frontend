import React  from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { uuid } from "uuidv4";

const FormToDoList = () => {
  const { register, control, handleSubmit, reset, trigger, setError, errors } = useForm(
    {}
  );
  const { fields: lists, append: appendList, remove: removeList } = useFieldArray({
    control,
    name: "lists",
  });

  const { fields: tasks, append: appendTask, remove: removeTask } = useFieldArray({
    control,
    name: "tasks",
  });
  const handleSend = (data) => {
    data.board = { name: data.board, id: uuid() };
    data.lists = data.lists.map((el) => {
      el.id = uuid();
      el.boardId = data.board.id;
      return el;
    });
    data.tasks = data.tasks.map((el) => {
      const regExp = /\(([^)]+)\)/;
      const keyName = Object.keys(el)[0];
      let ind = +regExp.exec(keyName)[1];
      el.name = el[keyName];
      delete el[keyName];
      el.id = uuid();
      el.listId = data.lists[ind].id;
      return el;
    });
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSend)}>
      <input name="board" ref={register({ required: true })} defaultValue={"board 1"} />
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
            <button
              type="button"
              onClick={() => appendTask({ [`lists(${indList})name`]: "task 1" })}
            >
              Create Task
            </button>

            <button type="button" onClick={() => removeList(indList)}>
              Delete
            </button>
            
            <ul>
              {tasks.map((itemTask, indTask) => {
                const regExp = /\(([^)]+)\)/;
                const keyName = Object.keys(itemTask)[1];
                let ind = +regExp.exec(keyName)[1];
                return (
                  ind === indList && (
                    <li key={itemTask.id}>
                      <input
                        name={`tasks[${indTask}].lists(${indList})name`}
                        ref={register()}
                        defaultValue={itemTask[`lists(${indList})name`]}
                      />                      
                      <Controller
                        as={<input />}
                        name={`tasks[${indTask}].description`}
                        control={control}
                        defaultValue={""}
                      />
                      <button type="button" onClick={() => removeTask(indTask)}>
                        Delete
                      </button>
                    </li>
                  )
                );
              })}
            </ul>
          </li>
        ))}
      </ul>

      <input type="submit" />
    </form>
  );
};
export default FormToDoList;
