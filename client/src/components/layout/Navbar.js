import React, { useContext, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import PasswordContext from "../../context/password/passwordContext";

export const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const passwordContext = useContext(PasswordContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearPasswords } = passwordContext;
  const onLogout = () => {
    logout();
    clearPasswords();
  };
  const authLinks = (
    <Fragment>
      <li>{user && user.name} </li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {/* <li>
                    <Link to='/'>Home</Link>
                </li>                                       ///if we plan to add more pages to application
                
                <li>
                    <Link to='/about'>About</Link>
                </li> */}
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: "Password Keeper",
  icon: "fas fa-id-card-alt",
};
export default Navbar;
