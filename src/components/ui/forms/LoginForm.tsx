import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../../Store';
import { useMutation } from '@apollo/react-hooks';
import { MutationLogIn } from '../../../graphql';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import validateUser from '../../../utils/validation';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LinearProgress from '@material-ui/core/LinearProgress';

export interface LoginFormProps {
  props: any;
  history: any;
}

interface LoginFormState {
  username: string;
  password: string;
  showPassword: boolean;
  formErrors: Array<object>;
  usernameError: boolean;
  passwordError: boolean;
}

const LoginForm: React.FC<LoginFormProps> = props => {
  const classes = useStyles();

  // UseEffect (componentDidMount) on initial render
  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  // Global state
  const { dispatch }: any = useStore();

  // Local state
  const [values, setValues] = useState<LoginFormState>({
    username: '',
    password: '',
    showPassword: false,
    formErrors: [],
    usernameError: false,
    passwordError: false
  });

  // Refs
  const usernameInput: any = useRef();
  const passwordInput: any = useRef();

  // Mutation login hook
  const [
    loginUser,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(MutationLogIn, {
    onError: ({ graphQLErrors }) => {
      console.log(graphQLErrors);
      if (graphQLErrors[0].message === 'This user has not been registered.') {
        setValues(prevState => ({
          ...prevState,
          usernameError: true,
          passwordError: false
        }));
      } else if (graphQLErrors[0].message === 'Your password is invalid!') {
        setValues(prevState => ({
          ...prevState,
          usernameError: false,
          passwordError: true
        }));
      }
    },
    onCompleted: ({
      loginUser: {
        token,
        user: { id }
      }
    }) => {
      dispatch({ type: 'login', args: { token, id } });
    }
  });

  // Login button
  async function _loginBtn() {
    if (values.username === '') {
      setValues(prevState => ({
        ...prevState,
        formErrors: [{ message: 'Enter your username' }],
        usernameError: true
      }));
      return usernameInput.current.focus();
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
    const { error }: any = await validateUser(values.username, values.password);

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

    // Trigger loginUser mutation to login the user server side.
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
      {/* Mutatoin loading progress bar */}
      {mutationLoading && <LinearProgress className={classes.loadingLinear} />}
      <Typography variant="h4" component="h1">
        Sign in to your account
      </Typography>
      <Typography component="p">Enter your username and password.</Typography>
      <form className={classes.container}>
        <TextField
          error={values.usernameError}
          label="Username"
          placeholder="Username"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={handleChange('username')}
          value={values.username}
          inputRef={usernameInput}
        />
        <TextField
          error={values.passwordError}
          label="Password"
          placeholder="Password"
          className={classes.textField}
          type={values.showPassword ? 'text' : 'password'}
          margin="normal"
          variant="outlined"
          onChange={handleChange('password')}
          value={values.password}
          inputRef={passwordInput}
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

export default LoginForm;
