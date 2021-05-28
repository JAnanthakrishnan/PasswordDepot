import React, { useContext, Fragment, useEffect } from "react";
import PasswordContext from "../../context/password/passwordContext";
import PasswordItem from "./PasswordItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "../layout/Spinner";

const Passwords = () => {
  const passwordContext = useContext(PasswordContext);
  const { passwords, filtered, getPasswords, loading } = passwordContext;
  useEffect(() => {
    getPasswords();
    //eslint-disable-next-line
  }, []);
  if (passwords !== null && passwords.length === 0) {
    return <h4>Please add a password</h4>;
  }
  return (
    <Fragment>
      {passwords !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((password) => (
                <CSSTransition
                  key={password._id}
                  timeout={500}
                  classNames="item"
                >
                  <PasswordItem password={password} />
                </CSSTransition>
              ))
            : passwords.map((password) => (
                <CSSTransition
                  key={password._id}
                  timeout={500}
                  classNames="item"
                >
                  <PasswordItem password={password} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Passwords;
