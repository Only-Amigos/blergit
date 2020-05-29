import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import { createPost } from '../../store/actions/postsActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const CreatePost = (props) => {
  const [postContent, setPostContent] = useState({
    title: '',
    content: '',
    userId: '',
    imgUrl: ''
  });

  const [shouldRedirect, setShouldRedirect] = useState({
    toHomepage: false
  });

  // const [postDate, setPostDate] = useState({
  //   postDate: null
  // });

  const handleInputChange = (e) => {
    setPostContent({...postContent,
      [e.target.id]: e.target.value,
      userId: props.auth.uid
    });
  };

  const handleUploadImg = (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`/images/${file.name}`);
    storageRef.put(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // setPostDate({...postDate,
    //   postDate: firebase.firestore.FieldValue.serverTimestamp()
    // })

    props.createPost(postContent);

    setPostContent({...postContent,
      title: '',
      content: '',
      userId: props.auth.uid
    });

    setShouldRedirect({...shouldRedirect,
      toHomepage: true,
    });
  };

  if (!props.auth.uid) {
    return <Redirect to='/signin' />
  }

  if (shouldRedirect.toHomepage === true) {
    return <Redirect to='/' />
  }

  return (
    <div className='box create-post'>
      <h3 className='title is-size-4'>Create your Blergit post</h3>

      <form onSubmit={handleSubmit} className='new-post-form'>
        <div className='field'>
          <label htmlFor='title' className='label'>Title</label>
          <div className='control'>
            <input
              type='text'
              id='title'
              className='input'
              onChange={handleInputChange}
              value={postContent.title} />
          </div>
        </div>
        <div className='field'>
          <label htmlFor='content' className='label'>Content</label>
          <div className='control'>
            <textarea
              id='content'
              className='textarea'
              cols='50'
              rows='10'
              onChange={handleInputChange}
              value={postContent.content}></textarea>
          </div>
        </div>
        <div className='field'>
          <label htmlFor='imgUrl' className='label'>Image url
            <span className='has-text-grey-light'> (optional)</span>
          </label>
          <div className='control'>
            <input
              type='text'
              id='imgUrl'
              className='input'
              onChange={handleInputChange}
              value={postContent.imgUrl}/>
          </div>
        </div>
        <div className='field'>
          <label htmlFor='title' className='label'>Upload image file
            <span className='has-text-grey-light'> (optional)</span>
          </label>
          <label className='file-label'>
            <input
              type='file'
              className='file-input'
              onChange={handleUploadImg} />
            <span className='file-cta'>
              <span className='file-label'>
                Choose a file…
              </span>
            </span>
          </label>
          <progress className='progress is-link' value='0' max='100'>0%</progress>
        </div>
        <div className='field'>
          <div className='control'>
            <button className='button is-info'>SUBMIT</button>
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts || state.posts.posts,
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (post) => dispatch(createPost(post))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'posts'}
  ])
)(CreatePost)