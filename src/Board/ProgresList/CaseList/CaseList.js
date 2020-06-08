import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import s from "./CaseList.module.css"
import {
  getCaseList,
  getNameActiveBoard,
  getProgressList,
} from "../../../Data/Selectors";

let CaseList = ({ nameObjectProgressList }) => {
  let state = useSelector((state) => state);

  let caseList = getCaseList(
    state,
    getNameActiveBoard(state),
    nameObjectProgressList
  );

  caseList = caseList.map(e=>(
    <div className={s.case} >
      {e.content}
    </div>
    
    ))

  return <div>{caseList}</div>;
};

export default CaseList;
