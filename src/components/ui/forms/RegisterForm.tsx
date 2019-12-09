import React, { useState, useRef, useEffect } from 'react';
import handleEventChange from '../../../utils/form';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { useMutation } from '@apollo/react-hooks';
import { MutationRegister } from '../../../graphql';
import { useStore } from '../../../Store';
import { validateRegisteredUser } from '../../../utils/validation';

export interface RegisterFormState {
  username: string;
  email: string;
  password: string;
  formErrors: Array<object>;
  usernameError: boolean;
  passwordError: boolean;
}

export interface RegisterFormProps {
  props: any;
  history: any;
}

const RegisterForm: React.FC<RegisterFormProps> = props => {
  const classes = useStyles();

  // UseEffect (componentDidMount) on initial render
  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  // Global state
  const { dispatch } = useStore();

  // Local State
  const [values, setValues] = useState<RegisterFormState>({
    username: '',
    email: '',
    password: '',
    formErrors: [],
    usernameError: false,
    passwordError: false
  });

  // Refs
  const usernameInput: any = useRef();
  const emailInput: any = useRef();
  const passwordInput: any = useRef();

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

  async function _registerBtn() {
    if (values.username === '') {
      setValues(prevState => ({
        ...prevState,
        formErrors: [{ message: 'Enter your username' }],
        usernameError: true
      }));
      return usernameInput.current.focus();
    }

    if (values.email === '') {
      setValues(prevState => ({
        ...prevState,
        formErrors: [{ message: 'Enter your email' }],
        emailError: true
      }));
      return emailInput.current.focus();
    }

    if (values.password === '') {
      setValues(prevState => ({
        ...prevState,
        formErrors: [{ message: 'Enter your password' }],
        passwordError: true
      }));
      return passwordInput.current.focus();
    }

    // Validate Form
    const { error }: any = await validateRegisteredUser(
      values.username,
      values.email,
      values.password
    );

    // Check if errors exist and update formErrors with errors.
    if (error)
      return setValues(prevState => ({
        ...prevState,
        formErrors: error.details
      }));

    // Reset form errors if no errors.
    setValues(prevState => ({
      ...prevState,
      formErrors: [],
      usernameError: false,
      passwordError: false
    }));

    // Trigger registerUser mutation to login the user server side.
    registerUser({
      variables: {
        userName: values.username,
        email: values.email,
        password: values.password
      }
    });
  }

  return (
    <React.Fragment>
      {/* Mutatoin loading progress bar */}
      {mutationLoading && <LinearProgress className={classes.loadingLinear} />}
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
          onChange={handleEventChange('username', values, setValues)}
          value={values.username}
          inputRef={usernameInput}
        />
        <TextField
          id="outlined-with-placeholder"
          label="Email"
          placeholder="Email"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={handleEventChange('email', values, setValues)}
          value={values.email}
          inputRef={emailInput}
        />
        <TextField
          id="outlined-with-placeholder"
          label="Password"
          placeholder="Password"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={handleEventChange('password', values, setValues)}
          value={values.password}
          inputRef={passwordInput}
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

        {/* Mutation  error messages */}
        {mutationError && (
          <Typography
            variant="body2"
            gutterBottom
            style={{ width: '100%', color: '#d93025' }}
          >
            {mutationError.graphQLErrors[0].message}
          </Typography>
        )}

        {/* Form error messages */}
        {values.formErrors.length !== 0
          ? values.formErrors.map((error: any | null, index: number) => (
              <Typography
                key={index}
                variant="body2"
                gutterBottom
                style={{ width: '100%', color: '#d93025' }}
              >
                {error.message}.
              </Typography>
            ))
          : ''}
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
    },
    loadingLinear: {
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0
    }
  })
);

export default RegisterForm;
