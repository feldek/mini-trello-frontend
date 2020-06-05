import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useLocalStorage from "local-storage-hook";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./ProgressLists.module.css";

let ProgressLists = () => {
  let boards = useSelector((state) => state.board).listBoard;
  let activeBoardID = useSelector((state) => state.board).activeObject.id;
  let nameProgressLists = [];

  let progressList = boards[`board ${activeBoardID}`].progressList;

  for (let elemProgress in progressList) {
    nameProgressLists.push(
      <div className={s.progressList}>{progressList[elemProgress]}</div>
    );
  }
  return <div className={s.boxProgressList}>{nameProgressLists}</div>;
};

export default ProgressLists;
