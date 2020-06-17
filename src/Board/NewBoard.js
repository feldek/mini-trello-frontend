import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { uuid } from "uuidv4";
import { createBoard } from "../Data/BoardReducer";
import s from "./NewBoard.module.css";

let NewBoard = () => {  
  const dispatch = useDispatch();
  const { handleSubmit, register, errors } = useForm();

  const [toggle, setToggle] = useState(false);

  return (
    <>
      {!toggle && (
        <button className={s.create} onClick={() => setToggle(true)}>
          Create new board
        </button>
      )}
      {toggle && (
        <div className={s.box}>
          <form
            className={s.form}
            onSubmit={handleSubmit((elem, e) => {
              dispatch(createBoard(elem.name, uuid()));
              e.target.reset();
            })}
          >
            <label>
              Create new board
              <input name="name" className={s.input} ref={register()} />
              {errors.name && errors.name.message}
            </label>
            <div className={s.buttons}>
              <button type="submit">Create</button>
              <button type="submit" onClick={() => setToggle(false)}>
                Cansel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default NewBoard;
