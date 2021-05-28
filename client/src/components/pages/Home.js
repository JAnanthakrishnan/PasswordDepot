import React, { useContext, useEffect } from "react";
import Passwords from "../passwords/Passwords";
import PasswordForm from "../passwords/PasswordForm";
import PasswordFilter from "../passwords/PasswordFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="grid-2">
      <div>
        <PasswordForm />
      </div>
      <div>
        <PasswordFilter />
        <Passwords />
      </div>
    </div>
  );
};

export default Home;
