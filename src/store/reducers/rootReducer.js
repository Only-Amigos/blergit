import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
// import authReducer from './authReducer';
import postReducer from './postsReducer';

const rootReducer = combineReducers({
  // auth: authReducer,
  posts: postReducer,
  firestore: firestoreReducer
});

export default rootReducer;