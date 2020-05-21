const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    //Make async call(s) to auth Firestore
    const firebase = getFirebase();
    console.log(credentials);
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    )
    .then(() => {
      dispatch({
        type: 'LOGIN_SUCCESS'
      })
    }).catch((err) => {
      dispatch({
        type: 'LOGIN_ERROR',
        err
      })
    });
  }
}

const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut()
    .then(() => {
      dispatch({
        type: 'SIGNOUT_SUCCESS'
      })
    })
  }
}

export { signIn, signOut };
