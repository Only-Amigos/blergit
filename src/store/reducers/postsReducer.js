const initialState = {
  posts: [
    {id: 1, title: 'Title one', content: 'Some content lorem ipsum'},
    {id: 2, title: 'Title two', content: 'Some more content lorem ipsum'},
    {id: 3, title: 'Title three', content: 'Yet more content lorem ipsum'}
  ]
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_POST':
      console.log('Boom; created post', action.payload);
      return state;
    case 'CREATE_POST_ERROR':
      console.log('Error creating post', action.err);
      return state;
    default:
      return state;
  }
};

export default postReducer;