import React, { useContext, useEffect } from "react";
import Passwords from "../passwords/Passwords";
import PasswordForm from "../passwords/PasswordForm";
import PasswordFilter from "../passwords/PasswordFilter";
import AuthContext from "../../context/auth/authContext";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import PasswordGenerate from "../passwords/PasswordGenerate";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "5%",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={4}>
          <PasswordForm />
          <PasswordGenerate />
        </Grid>
        <Grid item xs={8}>
          <PasswordFilter />
          <Passwords />
        </Grid>
      </Grid>
    </div>
    // <div className="grid-2">
    //   <div>
    //     <PasswordForm />
    //   </div>
    //   <div>
    //     <PasswordFilter />
    //     <Passwords />
    //   </div>
    // </div>
  );
};

export default Home;
