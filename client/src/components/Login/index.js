import React from 'react';
import {
  Grid,
  Container,
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core';

import style from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      direction="column"
      className={style.login}
    >
      <h3>Login to start playing</h3>
      <FormGroup>
        <FormControl>
          <InputLabel htmlFor="my-input">Name</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
        </FormControl>
      </FormGroup>
    </Grid>
  );
};

export default LoginPage;
