import React, { useContext } from "react";
import PropTypes from "prop-types";
import PasswordContext from "../../context/password/passwordContext";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import GroupIcon from "@material-ui/icons/Group";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function PasswordItem({ password }) {
  const classes = useStyles();
  const passwordContext = useContext(PasswordContext);
  const { _id, siteUrl, username, pword, team } = password;
  const { setCurrent, clearCurrent, deletePassword } = passwordContext;
  const onDelete = () => {
    deletePassword(_id);
    clearCurrent();
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={1}
            m={1}
          >
            <Box p={1}>
              <Typography gutterBottom variant="h5" component="h2">
                {siteUrl}
              </Typography>
            </Box>
            <Box p={1}>
              {" "}
              <Chip
                icon={<GroupIcon />}
                label={team}
                clickable
                color="primary"
              />
            </Box>
          </Box>

          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
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
  );
}

PasswordItem.propTypes = {
  password: PropTypes.object.isRequired,
};

export default PasswordItem;
