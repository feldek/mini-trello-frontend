import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./CaseList.module.css";
import { useForm } from "react-hook-form";
import { createCaseList } from "../../../Data/BoardReducerOld";
import { getNumberActiveBoard } from "../../../Data/Selectors";

let CreateCase = ({ nameObjectProgressList }) => {
  const dispatch = useDispatch();
  const { handleSubmit, register, errors, reset } = useForm();
  const state = useSelector((state) => state);

  return (
    <form className={s.form}
      onSubmit={handleSubmit((e) => {
        dispatch(
          createCaseList(
            e.nameCase,
            getNumberActiveBoard(state),
            nameObjectProgressList
          )
        );
      })}
    >
      <input name="nameCase" ref={register()} />
      {errors.nameCase && errors.nameCase.message}
      <button type="submit">Add</button>
    </form>
  );
};

export default CreateCase;
