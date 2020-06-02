const initialState = {
  posts: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_POST':
      return state;
    case 'CREATE_POST_ERROR':
      return state;
    case 'EDIT_POST':
      return state;
    case 'EDIT_POST_ERROR':
      return state;
    case 'DELETE_POST':
      return state;
    case 'DELETE_POST_ERROR':
      return state;
    case 'ADD_UPDOOT':
      return state;
    case 'UPDOOT_ERROR':
      return state;
    default:
      return state;
  }
};

export default postReducer;
