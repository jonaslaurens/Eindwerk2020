import React, { useState, useEffect, createContext } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../../helpers/baseUrl';

const INITIAL_STATE = {
  name: '',
  casinoServer: '',
  secretCode: '',
};

export const WSContext = createContext();

export const WSProvider = (props) => {
  const [socket, setSocket] = useState({});
  const [formValues, setFormValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    setSocket(io(BASE_URL));
  }, []);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await socket.emit('login', formValues);

    await socket.on('casino.error', (payload) => {
      const errorMsg = payload;
      setErrors(errorMsg);
    });
  };

  return (
    <WSContext.Provider
      value={{ formValues, handleChange, handleSubmit, errors }}
    >
      {props.children}
    </WSContext.Provider>
  );
};
