import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../Data/DataUserReducer";
import ConfirmDelete from "../ExtraComponents/ConfirmDelete";

const LogOut = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
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
