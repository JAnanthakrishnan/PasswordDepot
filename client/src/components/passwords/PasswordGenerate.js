import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { generate } from "generate-password";

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

const PasswordGenerate = () => {
  const classes = useStyles();

  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    let p = generate({ length: 12, numbers: true });
    setPassword(p);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Generate Password
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
                InputProps={{
                  readOnly: true,
                }}
                label="Genarated Password"
                value={password}
                autoFocus
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
              Generate Password
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default PasswordGenerate;
