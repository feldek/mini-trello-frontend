import React from "react";
import { useDispatch } from "react-redux";
import { setBoards } from "../Data/BoardReducer";
import { setUser } from "../Data/UserReducer";
import ConfirmDelete from "../ExtraComponents/ConfirmDelete";

const LogOut = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(setBoards([]));
    dispatch(setUser("", "", false, false));
  };

  return (
    <>
      {visible && (
        <ConfirmDelete
          onConfirm={() => handleLogOut()}
          setToggle={setVisible}
          phrase="log out"
          phraseButton="Log out"
        />
      )}
    </>
  );
};

export default LogOut;
