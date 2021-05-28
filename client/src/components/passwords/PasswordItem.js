import React, { useContext } from "react";
import PropTypes from "prop-types";
import PasswordContext from "../../context/password/passwordContext";

const PasswordItem = ({ password }) => {
  const passwordContext = useContext(PasswordContext);
  const { _id, siteUrl, username, pword, team } = password;
  const { setCurrent, clearCurrent, deletePassword } = passwordContext;
  const onDelete = () => {
    deletePassword(_id);
    clearCurrent();
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {siteUrl}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (Math.random * 10 > 5 ? "badge-success" : "badge-primary")
          }
        >
          {team.charAt(0).toUpperCase() + team.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {username && (
          <li>
            <i className="fas fa-envelope-open" /> {username}
          </li>
        )}
        {pword && (
          <li>
            <i className="fas fa-phone" /> {pword}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(password)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};
PasswordItem.propTypes = {
  password: PropTypes.object.isRequired,
};

export default PasswordItem;
