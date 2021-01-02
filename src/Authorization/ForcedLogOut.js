import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { forcedLogOut } from '../Constants';
import { onSetUser } from '../Reducers/UserReducer';
import s from './SignIn.module.css';

const ForcedLogOut = () => {
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(9);
  useEffect(() => {
    dispatch(onSetUser({ authorization: false, error: 'wrong autentificate token' }));
  }, []);
  useEffect(() => {
    if (timer > 0) {
      const time = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => {
        clearTimeout(time);
      };
    }
    window.location.replace(forcedLogOut);
  }, [timer]);

  return (
    <div className={`${s.background} background`}>
      <div className={s.box}>
        Logout due to incorrect authorization
        <div>
          You will be redirected to the login page in
          {timer}
          {' '}
          seconds
        </div>
        <Link to="/">
          <Button type="primary">or click here for redirected</Button>
        </Link>
      </div>
    </div>
  );
};

export default ForcedLogOut;
