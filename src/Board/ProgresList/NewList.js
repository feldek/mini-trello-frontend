import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createList } from "../../Data/ListReducer";
import { createEmptyCase } from "../../Data/CaseReducer";
import { uuid } from "uuidv4";
import { useLocation, Link } from "react-router-dom";
import s from "./NewList.module.css";

let NewList = () => {
  let boardId = useLocation().pathname.replace("/board/", "");
  const dispatch = useDispatch();
  const { handleSubmit, register, errors, reset } = useForm();

  return (
    <div className={s.formAndBack}>
      <div className={s.box}>
        <form
          className={s.form}
          onSubmit={handleSubmit((elem, e) => {
            let listId = uuid();
            dispatch(createEmptyCase(listId));
            dispatch(createList(elem.name, listId, boardId));
            e.target.reset();
          })}
        >
          <label>
            <input
              name="name"
              className={s.input}
              ref={register()}
              placeholder="new list"
            />
            {errors.name && errors.name.message}
          </label>
          <button className={s.button} type="submit">
            Add
          </button>
        </form>
      </div>
      <Link to="/" className={s.back}>
        <button>Back to board</button>
      </Link>
    </div>
  );
};
export default NewList;
