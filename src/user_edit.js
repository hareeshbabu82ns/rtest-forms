import React from 'react';

import * as yup from 'yup'
import _ from 'lodash'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DateMomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { useStateMachine } from 'little-state-machine'
import {
  useRouteMatch,
  useParams,
} from "react-router-dom";

import useForm from 'react-hook-form'
import moment from 'moment';

import UserForm from './user_form';

const genderOptions = [
  { key: 'F', value: 'F', text: 'Female' },
  { key: 'M', value: 'M', text: 'Male' },
  { key: '', value: '', text: 'None' },
];

function UserEdit() {
  const { state: { nextUserIdCounter, users } } = useStateMachine();
  const { userId } = useParams();
  const currentUser = _.find(users, ['id', userId]) || { name: '', dob: '' }

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { ...currentUser }
  });
  const onSubmit = data => {
    console.log(JSON.stringify(data, null));
  };

  return (
    <UserForm key={`user${currentUser.name}`} currentUser={currentUser} />
  )
}

export default UserEdit;