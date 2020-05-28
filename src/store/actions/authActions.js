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

const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((response) => {
      return firestore.collection('users')
      .doc(response.user.uid)
      .set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      })
    }).then(() => {
      dispatch({type: 'SIGNUP_SUCCESS'})
    }).catch((err) => {
      dispatch({type: 'SIGNUP_ERROR', err})
    })
  }
}

export { signIn, signOut, signUp };
