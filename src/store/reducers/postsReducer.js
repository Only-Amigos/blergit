const initialState = {
  posts: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_POST':
      console.log('Boom; created post', action.payload);
      return state;
    case 'CREATE_POST_ERROR':
      console.log('Error creating post', action.err);
      return state;
    case 'DELETE_POST':
      console.log('Crash deleted post');
      return state;
    case 'DELETE_POST_ERROR':
      console.log('Error deleting post', action.err);
      return state;
    default:
      return state;
  }
};

export default postReducer;
