import React, { useContext, useEffect } from "react";
import PasswordContext from "../../context/password/passwordContext";
import PasswordItem from "./PasswordItem";
import Spinner from "../layout/Spinner";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "6%",
    paddingBottom: "25%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Passwords = () => {
  const classes = useStyles();
  const passwordContext = useContext(PasswordContext);
  const { passwords, filtered, getPasswords, loading } = passwordContext;
  useEffect(() => {
    getPasswords();
    //eslint-disable-next-line
  }, []);
  if (passwords !== null && passwords.length === 0) {
    return (
      <Box
        style={{
          maxHeight: "100vh",
          overflow: "auto",
          overflowX: "hidden",
          paddingLeft: "10%",
        }}
        className={classes.root}
      >
        <Typography variant="h4">Please add a password</Typography>
      </Box>
    );
  }
  return (
    <Box
      style={{ maxHeight: "100vh", overflow: "auto", overflowX: "hidden" }}
      className={classes.root}
    >
      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        direction="column"
      >
        {passwords !== null && !loading ? (
          filtered !== null ? (
            filtered.map((password) => (
              <PasswordItem password={password} key={password.siteUrl} />
            ))
          ) : (
            passwords.map((password) => (
              <PasswordItem password={password} key={password.siteUrl} />
            ))
          )
        ) : (
          <Spinner />
        )}
      </Grid>
    </Box>
  );
};

export default Passwords;
