import React, { useState, useContext, useEffect } from "react";
import PasswordContext from "../../context/password/passwordContext";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const PasswordForm = () => {
  const classes = useStyles();
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
        pword: "",
        team: "",
      });
    }
  }, [passwordContext, current]);

  const [password, setPassword] = useState({
    siteUrl: "",
    username: "",
    pword: "",
    team: "",
  });
  const { siteUrl, username, pword, team } = password;

  const onChange = (e) =>
    setPassword({ ...password, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    console.log(password);
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {current ? "Update Password" : "Add Password"}
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="siteUrl"
                name="siteUrl"
                variant="outlined"
                required
                fullWidth
                id="siteUrl"
                label="Site URL"
                value={siteUrl}
                onChange={onChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={onChange}
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="pword"
                label="Password"
                name="pword"
                value={pword}
                onChange={onChange}
                autoComplete="pword"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="team"
                label="Team"
                type="team"
                id="team"
                value={team}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {current ? "Update Password" : "Add Password"}
            </Button>
            {current && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={clearAll}
              >
                Clear
              </Button>
            )}
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default PasswordForm;
