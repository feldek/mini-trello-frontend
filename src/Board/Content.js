import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useLocalStorage from "local-storage-hook";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { createBoard, testText } from "../Data/BoardReducer";
import NewBoard from "./NewBoard";
import Boards from "./Boards";
import { useSelector } from "react-redux";
import ProgressLists from "./ProgresList/ProgresLists";
import NewProgressList from "./ProgresList/NewProgressList";
import BoardDND from "./ProgresList/CaseList/BoardDND";

let Content = () => {
  return (
    <div>
        <NewBoard/>
        <Boards />
        <ProgressLists/>
        {/* <BoardDND/> */}
    </div>
  );
};

export default Content;
