import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import postReducer from './postsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;