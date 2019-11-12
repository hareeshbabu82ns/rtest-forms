import React, { useState, useEffect } from 'react';

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

import { useSnackbar } from 'notistack';

import { useStateMachine } from 'little-state-machine'
import {
  useRouteMatch,
  useParams,
} from "react-router-dom";

import useForm from 'react-hook-form'
import moment from 'moment';
const genderOptions = [
  { key: 'F', value: 'F', text: 'Female' },
  { key: 'M', value: 'M', text: 'Male' },
  { key: '', value: '', text: 'None' },
];

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  dob: yup.number().required(),
  gender: yup.string().max(1).min(1).required()
});

function UserForm(props) {

  const { currentUser } = props;

  const [user, setUser] = useState(currentUser);

  const { register, handleSubmit, setValue, errors, reset } = useForm({
    defaultValues: { ...user },
    validationSchema
  });

  const snackbar = useSnackbar();
  console.log(errors);
  Object.keys(errors).forEach((key) => {
    snackbar.enqueueSnackbar(errors[key].message, { variant: 'error' })
  })

  useEffect(() => {
    register({ name: "gender" })
    register({ name: "dob", required: true })
    register({ name: "hasAccount" })
  }, [register])

  const handleFieldChange = event => {
    // console.log(event)
    let { name, value, type, checked = false } = _.get(event, 'target', event);
    if (type && type === 'checkbox')
      value = checked;
    if (type && type === 'momentDate') {
      if (value)
        value = value.valueOf();
    }
    console.log(`${name}:${value}`)
    setValue(name, value)
    setUser({ ...user, [name]: value })
  }

  const onSubmit = data => {
    console.log(JSON.stringify(data, null));
  };

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateMomentUtils}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} >
            <Grid item xs={12}>
              <TextField
                error={_.isObject(errors.name)}
                fullWidth
                name="name"
                label="Name"
                placeholder="Enter Name"
                variant="outlined"
                inputRef={register}
                InputLabelProps={{
                  shrink: true,
                }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <KeyboardDatePicker
                autoOk
                fullWidth
                inputVariant="outlined"
                variant="inline"
                format="MM/DD/YYYY"
                margin="normal"
                id="dob"
                name="dob"
                label="Date of Birth"
                value={user.dob}
                onChange={(date, value) => handleFieldChange({ name: 'dob', type: 'momentDate', value: date })}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl>
                <FormControlLabel
                  fullWidth='true'
                  control={
                    <Switch
                      name="hasAccount"
                      checked={user.hasAccount}
                      onChange={handleFieldChange}
                    />
                  }
                  label="Has Account"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                id="gender"
                name="gender"
                label="Gender"
                margin="normal"
                variant="outlined"
                error={_.isObject(errors.gender)}
                value={user.gender}
                onChange={handleFieldChange}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {genderOptions.map(option => (
                  <MenuItem key={option.key} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} container spacing={3} justify="flex-end">
              <Grid item>
                <Button color="teal" variant="contained" type="button" onClick={() => reset()}>Reset</Button>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" type="submit">Update</Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </MuiPickersUtilsProvider>
    </React.Fragment>
  )
}

export default UserForm;