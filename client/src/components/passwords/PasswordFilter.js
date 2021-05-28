import React, { useContext, useRef, useEffect } from "react";
import PasswordContext from "../../context/password/passwordContext";

const PasswordFilter = () => {
  const passwordContext = useContext(PasswordContext);

  const { filterPasswords, clearFilter, filtered } = passwordContext;

  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterPasswords(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter Passwords..."
        onChange={onChange}
      />
    </form>
  );
};

export default PasswordFilter;
