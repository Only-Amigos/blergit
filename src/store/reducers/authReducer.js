const initialState = {
  isLoggedIn: false,
  authError: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        isLoggedIn: true,
        authError: null
      }
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        isLoggedIn: false,
        authError: 'Login failed, please try again.'
      }
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return {
        ...state,
        isLoggedIn: false
      }
    default:
      return state;
  }
};

export default authReducer;
