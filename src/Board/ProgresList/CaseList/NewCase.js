import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setCaseState, deleteCaseList } from "../../../Data/CaseReducer";
import s from "./NewCase.module.css";
import { deleteList } from "../../../Data/ListReducer";

const NewCase = ({ index, uuid }) => {
  const { handleSubmit, register, reset, errors } = useForm();
  const dispatch = useDispatch();
  const listState = useSelector((state) => state.lists);
  const state = useSelector((state) => state.cases);
  let style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };
  return (
    <div className={s.box}>
      <form
        className={s.form}
        style={style}
        onSubmit={handleSubmit((elem, e) => {
          dispatch(
            setCaseState(
              state.map((elemState, elemStateInd) => {
                if (elemStateInd === index)
                  return [
                    ...elemState,
                    {
                      id: uuid,
                      name: elem[uuid],
                      listId: listState[index].id,
                    },
                  ];
                else return [...elemState];
              })
            )
          );
          e.target.reset();
        })}
      >
        <label>
          <input name={uuid} ref={register()} placeholder="new case" />
          {errors[uuid] && errors[uuid].message}
        </label>
        <div className={s.buttons}>
          <button type="submit">Add</button>
          <button
            type="submit"
            onClick={() => (
              dispatch(deleteList(index)), dispatch(deleteCaseList(index))
            )}
          >
            Delete list
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCase;
