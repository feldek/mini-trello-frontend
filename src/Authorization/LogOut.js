import React from 'react';
import { useDispatch } from 'react-redux';
import { clearedData } from '../Redux/User/UserSlice';
import ConfirmDelete from '../ExtraComponents/ConfirmDelete/ConfirmDelete';

const LogOut = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(clearedData());
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
