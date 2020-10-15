import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toDoListHost } from "../Api/Api";
import { setUser } from "../Data/UserReducer";
import s from "./SignIn.module.css";
const GetOut = () => {
  const dispatch = useDispatch();
  let [timer, setTimer] = useState(9);
  useEffect(() => {
    dispatch(setUser({ authorization: false, error: "wrong autentificate token" }));
  }, []);
  useEffect(() => {
    if (timer > 0) {
      let time = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => {
        clearTimeout(time);
      };
    } else {
      window.location.replace(toDoListHost);
    }
  }, [timer]);
  return (
    <div className={`${s.background} background`}>
      <div className={s.box}>
        Logout due to incorrect authorization
        <div>You will be redirected to the login page in {timer} seconds</div>
        <Link to={toDoListHost}>
          <Button type="primary">or click here for redirected</Button>
        </Link>
      </div>
    </div>
  );
};

export default GetOut;
