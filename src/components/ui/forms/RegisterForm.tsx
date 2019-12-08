import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { useMutation } from '@apollo/react-hooks';
import { MutationRegister } from '../../../graphql';
import { useStore } from '../../../Store';

export interface RegisterFormProps {
  props: any;
  history: any;
}

const RegisterForm: React.FC<RegisterFormProps> = props => {
  const classes = useStyles();

  const { dispatch } = useStore();

  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [email, updateEmail] = useState('');

  const [
    registerUser,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(MutationRegister, {
    onError: error => console.log(error),
    onCompleted: ({
      registerUser: {
        token,
        user: { id }
      }
    }) => {
      dispatch({ type: 'register', args: { token, id } });
    }
  });

  function _loginBtn() {
    props.history.push('/');
  }

  function _registerBtn() {
    registerUser({
      variables: { userName: username, email: email, password: password }
    });
  }

  return (
    <React.Fragment>
      <Typography variant="h4" component="h1">
        Create a new account
      </Typography>
      <Typography component="p">
        Enter your username, email, and password.
      </Typography>
      <form className={classes.container}>
        <TextField
          id="outlined-with-placeholder"
          label="Username"
          placeholder="Username"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={e => updateUsername(e.target.value)}
          value={username}
        />
        <TextField
          id="outlined-with-placeholder"
          label="Email"
          placeholder="Email"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={e => updateEmail(e.target.value)}
          value={email}
        />
        <TextField
          id="outlined-with-placeholder"
          label="Password"
          placeholder="Password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={e => updatePassword(e.target.value)}
          value={password}
        />
        <Button
          onClick={_registerBtn}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Register
        </Button>
        <Button
          onClick={_loginBtn}
          variant="outlined"
          color="primary"
          className={classes.button}
        >
          Login
        </Button>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error :( Please try again</p>}
      </form>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      width: '100%',
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1)
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

export default RegisterForm;
