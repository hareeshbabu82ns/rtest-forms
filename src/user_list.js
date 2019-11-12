import React from 'react';
import { useHistory, useParams, NavLink } from "react-router-dom";

import { useStateMachine } from 'little-state-machine'
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import moment from 'moment'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function UserList() {
  const history = useHistory();
  const userId = history.location.pathname.replace('/users/', '');
  console.log(history.location);

  const classes = useStyles();
  const {
    state: { users },
  } = useStateMachine();

  return (
    <React.Fragment>
      <Typography variant="h5" color="inherit" noWrap>
        List of Users
      </Typography>
      <List className={classes.root}>
        {users && users.map((user) => (
          <ListItem button alignItems="flex-start" selected={user.id === userId}
            key={user.id} component={NavLink} to={`/users/${user.id}`}
          >
            <ListItemAvatar>
              <Avatar alt={user.name} src={user.imgUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={moment(user.dob).format('DD MMM Y')}
            />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

export default UserList;