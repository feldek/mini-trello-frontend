import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { useTypeSelector } from "./Redux/TypeHook";
import { setUserId } from "./Redux/User/UserAction";
import { clearedData, fetchUser, onSetUser } from "./Redux/User/UserSlice";
import Router from "./Routers";

function App() {
  const dispatch = useDispatch();
  const user = useTypeSelector((state) => state.user.authorization);
  useEffect(() => {
    const parseJwt = async () => {
      try {
        const token = localStorage.getItem("token") || undefined;
        const dataUser = await JSON.parse(atob(token.split(".")[1]));
        dispatch(setUserId({ id: dataUser.id }));
        dispatch(onSetUser({ authorization: true }));        
        await dispatch(fetchUser());
      } catch (e) {
        dispatch(clearedData());
        return null;
      }
    };
    parseJwt();
  }, [user, dispatch]);
  return <Router />;
}

export default App;
