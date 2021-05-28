import React, { useState, useContext, useEffect } from "react";
import PasswordContext from "../../context/password/passwordContext";

const PasswordForm = () => {
  const passwordContext = useContext(PasswordContext);

  const { addPassword, current, clearCurrent, updatePassword } =
    passwordContext;

  useEffect(() => {
    if (current !== null) {
      setPassword(current);
    } else {
      setPassword({
        siteUrl: "",
        username: "",
        password: "",
        team: "",
      });
    }
  }, [passwordContext, current]);

  const [password, setPassword] = useState({
    siteUrl: "",
    username: "",
    password: "",
    team: "",
  });
  const { siteUrl, username, pword, team } = password;

  const onChange = (e) =>
    setPassword({ ...password, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!current) {
      addPassword(password);
    } else {
      updatePassword(password);
    }
    clearAll();
  };
  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>{current ? "Edit Password" : "Add Password"}</h2>
      <input
        type="text"
        placeholder="Site URL"
        name="siteUrl"
        value={siteUrl}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Password"
        name="pword"
        value={pword}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Team Name"
        name="team"
        value={team}
        onChange={onChange}
      />
      {/* <h3>Team Name</h3>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />{" "}
      Professional{" "} */}
      <div>
        <input
          type="submit"
          value={current ? "Update Password" : "Add Password"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default PasswordForm;
