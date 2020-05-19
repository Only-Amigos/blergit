const createPost = (post) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    //Make async call(s) to DB
    const firestore = getFirestore();
    const computerDate = new Date();
    const readableDate = computerDate.toLocaleDateString();
    const readableTime = computerDate.toLocaleTimeString();
    // console.log(`${readableTime} on ${readableDate}`);

    firestore.collection('posts').add({
      ...post,
      createdAt: `${readableTime} on ${readableDate}`
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

const deletePost = (id, post) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    //Make async call(s) to DB
    const firestore = getFirestore();

    firestore.collection('posts').doc(id).delete()
    .then(() => {
      dispatch({
        type: 'DELETE_POST'
      })
    }).catch((err) => {
      dispatch({
        type: 'DELETE_POST_ERROR',
        err
      })
    });
  }
}

export { createPost, deletePost };
