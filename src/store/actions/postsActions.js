export const createPost = (post) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    //Make async call(s) to DB
    const firestore = getFirestore();

    firestore.collection('posts').add({
      ...post,
      createdAt: new Date()
    }).then(() => {
      dispatch({
        type: 'CREATE_POST',
        payload: post
      })
    }).catch((err) => {
      dispatch({
        type: 'CREATE_POST_ERROR',
        err
      })
    });
  }
}