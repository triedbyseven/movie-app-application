import React, { useState } from 'react';
import { useStore } from '../../../Store';
import { useMutation } from '@apollo/react-hooks';
import { MutationLogIn } from '../../../graphql';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export interface LoginFormProps {
  props: any;
  history: any;
}

interface LoginFormState {
  username: string;
  password: string;
  showPassword: boolean;
}

const LoginForm: React.FC<LoginFormProps> = props => {
  const classes = useStyles();

  // Global state
  const { state, dispatch }: any = useStore();

  // Local state
  const [values, setValues] = useState<LoginFormState>({
    username: '',
    password: '',
    showPassword: false
  });

  // Mutation login hook
  const [
    loginUser,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(MutationLogIn, {
    onError: error => console.log(error),
    onCompleted: ({ loginUser: { token } }) => {
      dispatch({ type: 'login', args: { token } });
    }
  });

  // Login button
  function _loginBtn() {
    loginUser({
      variables: { userName: values.username, password: values.password }
    });
  }

  // Register view button
  function _registerBtn() {
    props.history.push('/register');
  }

  // Handle change method to update state value from input fields
  const handleChange = (prop: keyof LoginFormState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // Handle change method to update click to show password button
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  // Handle change method to update password input
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <Typography variant="h4" component="h1">
        Sign in to your account
      </Typography>
      <Typography component="p">Enter your username and password.</Typography>
      <form className={classes.container}>
        <TextField
          label="Username"
          placeholder="Username"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={handleChange('username')}
          value={values.username}
        />
        <TextField
          label="Password"
          placeholder="Password"
          className={classes.textField}
          type={values.showPassword ? 'text' : 'password'}
          margin="normal"
          variant="outlined"
          onChange={handleChange('password')}
          value={values.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          onClick={_loginBtn}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Login
        </Button>
        <Button
          onClick={_registerBtn}
          variant="outlined"
          color="primary"
          className={classes.button}
        >
          Register
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

export default LoginForm;
