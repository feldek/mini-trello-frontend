import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useLocalStorage from "local-storage-hook";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./ProgressLists.module.css";
import {
  getProgressList,
  getNameActiveBoard,
  getNumberActiveBoard,
  getNameProgressList,
} from "../../Data/Selectors";
import NewProgressList from "./NewProgressList";
import CaseList from "./CaseList/CaseList";
import CreateCase from "./CaseList/CreateCase";

let ProgressLists = () => {
  const state = useSelector((state) => state);
  let idActiveBoard = getNumberActiveBoard(state);
  let nameProgressLists = [];

  let progressList = getProgressList(state, getNameActiveBoard(state));

  if (!progressList) return <div className={s.boxProgressList}></div>;

  for (let nameObjectProgressList in progressList) {
    let nameProgressList = getNameProgressList(
      state,
      getNameActiveBoard(state),
      nameObjectProgressList
    );
    // debugger
    nameProgressLists.push(
      <div className={s.nameAndCaseList}>
      <div className={s.progressList} key={s.nameObjectProgressList}>
       <div> {nameProgressList}</div>
        <CreateCase nameObjectProgressList={nameObjectProgressList}/>
      </div>
      <CaseList nameObjectProgressList={nameObjectProgressList}/>
      </div>
    );
  }
  return (
    <div className={s.boxProgressList}>
      {nameProgressLists}
      
      <NewProgressList />
    </div>
  );
};

export default ProgressLists;
