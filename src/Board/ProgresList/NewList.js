import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { createProgressList } from "../../Data/BoardReducerOld";
import { createList } from "../../Data/ListReducer";
import { createEmptyCase } from "../../Data/CaseReducer";
import { uuid } from "uuidv4";
import { useLocation } from "react-router-dom";

let NewList = () => {
  let boardId = useLocation().pathname.replace("/board/", "");
  const dispatch = useDispatch();
  const { handleSubmit, register, errors, reset } = useForm();
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
          dispatch(createEmptyCase());
          dispatch(createList(e.name, uuid(), boardId));          
        })}
      >
        <input name="name" ref={register()} />
        {errors.name && errors.name.message}
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
// let NewList = () => {

//   const dispatch = useDispatch();
//   const { handleSubmit, register, errors, reset } = useForm();
//   const state = useSelector((state) => state);
//   let calculationNumberProgressList = Object.keys(getProgressList(state, getNameActiveBoard(state))).length + 1;

//   let style = {
//     width: "200px",
//     height: "100px",
//     backgroundColor: "antiquewhite",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     border: "1px solid black",
//     margin: "20px",
//   };

//   return (
//     <div style={style}>
//       <form
//       onSubmit={handleSubmit((e) => {
//         dispatch(
//           createProgressList(
//             e.nameProgressList,
//             getNumberActiveBoard(state),
//             calculationNumberProgressList
//           )
//         );
//       })}
//       >
//         <input name="nameProgressList" ref={register()} />
//         {errors.nameProgressList && errors.nameProgressList.message}
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// };

export default NewList;
