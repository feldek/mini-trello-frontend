import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useLocalStorage from "local-storage-hook";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import NewBoard from "./NewBoard";
import Boards from "./Boards";
import { useSelector } from "react-redux";
import Lists from "./ProgresList/Lists";
import NewProgressList from "./ProgresList/NewList";
import BoardDND from "./ProgresList/CaseList/BoardDND";


let Content = () => {
  // console.log(uuid());


  return (
    <div>
      <Boards/>   
      {/* <Lists/>    */}
      <BoardDND />
    </div>
  );
};

export default Content;
