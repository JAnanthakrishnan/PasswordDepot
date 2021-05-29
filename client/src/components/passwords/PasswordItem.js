import React, { useContext } from "react";
import PropTypes from "prop-types";
import PasswordContext from "../../context/password/passwordContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import GroupIcon from "@material-ui/icons/Group";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import LinkIcon from "@material-ui/icons/Link";
import Link from "@material-ui/core/Link";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    textTransform: "none",
  },
  root: {
    minWidth: "100%",
  },
  color: {
    width: "80%",
  },

  media: {
    height: 300,
  },
}));

function PasswordItem({ password }) {
  const classes = useStyles();
  const passwordContext = useContext(PasswordContext);
  const { _id, siteUrl, username, pword, team } = password;
  const { setCurrent, clearCurrent, deletePassword } = passwordContext;
  const onDelete = () => {
    deletePassword(_id);
    clearCurrent();
  };
  let domain;
  try {
    domain = new URL(siteUrl);
  } catch (error) {
    domain = null;
  }
  if (domain !== null) {
    domain = domain.hostname.replace("www.", "");
  }

  return (
    <Grid item xs={12} className={classes.color}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {username.charAt(0).toUpperCase()}
            </Avatar>
          }
          // title={`Details of ${domain === null ? siteUrl : domain}`}
          title={
            <Chip icon={<GroupIcon />} label={team} clickable color="primary" />
          }
        />
        <CardActionArea>
          <CardContent>
            <Link href={domain === null ? "#" : siteUrl}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<LinkIcon />}
              >
                {siteUrl}
              </Button>
            </Link>
            <Box justifyContent="center" width="100%">
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<AccountCircleIcon />}
              >
                {username}
              </Button>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<VpnKeyIcon />}
              >
                {pword}
              </Button>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setCurrent(password);
            }}
          >
            Edit
          </Button>
          <Button size="small" color="primary" onClick={onDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

PasswordItem.propTypes = {
  password: PropTypes.object.isRequired,
};

export default PasswordItem;
