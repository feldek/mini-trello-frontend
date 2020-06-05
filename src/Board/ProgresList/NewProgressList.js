import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSelector } from "react-redux";

let NewProgressList = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register, errors, reset } = useForm();
  const activeObject = useSelector(state=> state.board.activeObject)

  const calculationIdProgressList = useSelector(
    (state) => Object.keys(state.board.listBoard).length + 1
  );

};

export default NewProgressList;
