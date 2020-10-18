import React from "react";
import { useDispatch } from "react-redux";
import { onClearedData } from "../Data/UserReducer";
import ConfirmDelete from "../ExtraComponents/ConfirmDelete";

const LogOut = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(onClearedData([]));
  };

  return (
    <ConfirmDelete
      onConfirm={() => handleLogOut()}
      setVisible={setVisible}
      visible={visible}
      phrase="log out"
      phraseButton="Log out"
    />
  );
};

export default LogOut;
