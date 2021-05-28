import React, { useReducer } from "react";
import PasswordContext from "./passwordContext";
import passwordReducer from "./passwordReducer";
import {
  ADD_PASSWORD,
  DELETE_PASSWORD,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_PASSWORD,
  FILTER_PASSWORDS,
  CLEAR_FILTER,
  PASSWORD_ERROR,
  GET_PASSWORDS,
  CLEAR_PASSWORDS,
} from "../types";
import axios from "axios";

const PasswordState = (props) => {
  const initialState = {
    passwords: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };
  const [state, dispatch] = useReducer(passwordReducer, initialState);
  //Get Passwords
  const getPasswords = async () => {
    try {
      const res = await axios.get("/api/passwords");
      dispatch({ type: GET_PASSWORDS, payload: res.data });
    } catch (err) {
      dispatch({
        type: PASSWORD_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Add password
  const addPassword = async (password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/passwords", password, config);
      dispatch({ type: ADD_PASSWORD, payload: res.data });
    } catch (err) {
      dispatch({
        type: PASSWORD_ERROR,
        payload: err.response.msg,
      });
    }
  };
  //Delete Password
  const deletePassword = async (id) => {
    try {
      await axios.delete(`/api/passwords/${id}`);
      dispatch({ type: DELETE_PASSWORD, payload: id });
    } catch (err) {
      dispatch({
        type: PASSWORD_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //clear Contacts
  const clearPasswords = () => {
    dispatch({ type: CLEAR_PASSWORDS });
  };
  //Set current contact
  const setCurrent = (password) => {
    dispatch({ type: SET_CURRENT, payload: password });
  };

  //Clear Current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Update contact
  const updatePassword = async (password) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/passwords/${password._id}`,
        password,
        config
      );
      dispatch({ type: UPDATE_PASSWORD, payload: res.data });
    } catch (err) {
      dispatch({
        type: PASSWORD_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Filter Contact
  const filterPasswords = (text) => {
    dispatch({ type: FILTER_PASSWORDS, payload: text });
  };

  //Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <PasswordContext.Provider
      value={{
        passwords: state.passwords,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addPassword,
        deletePassword,
        setCurrent,
        clearCurrent,
        updatePassword,
        filterPasswords,
        clearFilter,
        getPasswords,
        clearPasswords,
      }}
    >
      {props.children}
    </PasswordContext.Provider>
  );
};

export default PasswordState;
