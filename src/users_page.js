import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import {
  Route, Switch
} from "react-router-dom";

import UserEdit from './user_edit';
import UserList from './user_list';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

function UserPage() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" component="main" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <UserList></UserList>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Route path="/users/:userId" component={UserEdit} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default UserPage;