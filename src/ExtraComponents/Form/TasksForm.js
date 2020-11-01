import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { uuid } from "uuidv4";

const TasksForm = () => {
  return (
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
  );
};
