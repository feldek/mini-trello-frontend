import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useLocalStorage from "local-storage-hook";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createBoard, testText } from "../Data/BoardReducer";
import { useSelector } from "react-redux";
import { getBoardList } from "../Data/Selectors";

let NewBoard = () => {
  const [localStorage, setLocalStorage] = useLocalStorage("dataUser", "");
  const dispatch = useDispatch();

  const { handleSubmit, register, errors, reset } = useForm();

  const calculationNumberBoard = useSelector(
    (state) => Object.keys(getBoardList(state)).length + 1
  );
  
  // const calculationNumberBoard = useSelector(
  //   (state) => Object.keys(state.board.boardList).length + 1
  // );

  let style = {
    width: "200px",
    height: "100px",
    backgroundColor: "antiquewhite",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    margin: "20px",
  };

  return (
    <div style={style}>
      <form
        onSubmit={handleSubmit((e) => {
          dispatch(createBoard(e.boardName, calculationNumberBoard));
        })}
      >
        <input name="boardName" ref={register()} />
        {errors.boardName && errors.boardName.message}
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewBoard;
