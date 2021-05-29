import React, { useContext, useRef, useEffect } from "react";
import PasswordContext from "../../context/password/passwordContext";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  pos: {
    marginLeft: "20%",
  },
}));

const PasswordFilter = () => {
  const classes = useStyles();
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
      console.log(text.current.value);
      clearFilter();
    }
  };
  return (
    <div className={classes.pos}>
      <form className={classes.form}>
        <TextField
          variant="outlined"
          inputRef={text}
          style={{ width: "80%" }}
          margin="normal"
          type="text"
          id="text"
          label="Filter Passwords..."
          name="text"
          onChange={onChange}
          autoFocus
        />
      </form>
    </div>
    // <form>
    //   <
    //     ref={text}
    //     type="text"
    //     placeholder="Filter Passwords..."
    //     onChange={onChange}
    //   />
    // </form>
  );
};

export default PasswordFilter;
