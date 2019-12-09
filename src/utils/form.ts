interface FormState {
  username: string;
  password: string;
  email: string;
  showPassword: boolean;
  formErrors: Array<object>;
  usernameError: boolean;
  passwordError: boolean;
}

/**
 * Updates state with new value everytime input field is changed.
 * @param {Key of FormState} prop - Name of property in state.
 * @param {Object} values - All key/value pairs in state.
 * @param {Function} setValues - Method from react hooks that updates state.
 */

const handleEventChange = (
  prop: keyof FormState,
  values: any,
  setValues: any
) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setValues({ ...values, [prop]: event.target.value });
};

export default handleEventChange;
