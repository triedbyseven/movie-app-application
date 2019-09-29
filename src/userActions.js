import Cookies from 'js-cookie';

// Check if user is already logged in with by checking if there is a auth cookie
let token = Cookies.get('Authorization') || '';
token = token.split(' ')[1];

export const userInitialState = {
  user: {
    loggedIn: token != null,
    userId: '',
    token: token
  }
};

export const userActions = {
  login: (state, args) => {
    const token = args.token;
    const userId = args.id;

    Cookies.set('Authorization', `Bearer ${token}`);

    return {
      user: {
        loggedIn: true,
        userId: userId,
        token: token
      }
    };
  },
  logout: state => {
    Cookies.remove('Authorization');
    return { user: { loggedIn: false } };
  }
};
