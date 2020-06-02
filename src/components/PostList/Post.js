import React, { useState } from 'react';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { editPost } from '../../store/actions/postsActions';

import SocialBar from '../SocialBar/SocialBar';

const Post = (props) => {
  const { post } = props;

  const [editFieldState, setEditFieldState] = useState({
    editViz: false
  });

  const handleEditFieldStateClick = () => {
    const doesShow = editFieldState.editViz;
    setEditFieldState({
      ...editFieldState,
      editViz: !doesShow
    })
  }

  const [postContent, setPostContent] = useState({
    title: '',
    content: '',
    userId: props.auth.uid,
    imgUrl: '',
    postId: props.match.params.id
  });

  const [shouldRedirect, setShouldRedirect] = useState({
    toHomepage: false
  });

  const [imgFile, setImgFile] = useState({
    file: null
  });

  const handleInputChange = (e) => {
    setPostContent({...postContent,
      [e.target.id]: e.target.value
    });
  };

  const handleUploadImg = (e) => {
    const file = e.target.files[0];
    setImgFile({...imgFile,
      file: file
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (imgFile.file !== null) {
      const storageRef = firebase.storage().ref(`/images/${imgFile.file.name}`);
      let uploadTask = storageRef.put(imgFile.file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      }, () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL()
        .then((downloadURL) => {
          // console.log('File available at', downloadURL);
          props.editPost({ ...postContent,
            imgUrl: downloadURL
          });
        });
      });
    } else {
      props.editPost(postContent);
    };

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


  if (post) {
    return (
      <div>
        {!editFieldState.editViz ?
          <div className="box postlist-post__spacing">
            <h4 className='title is-size-5 has-text-weight-medium has-text-black-ter'>{post.title}</h4>

            {post.createdAt ? <p className="date-time is-size-6 has-text-grey">Posted at {post.createdAt}</p> : null}

            <p className='content is-size-6 has-text-grey-dark'>{post.content}</p>

            <SocialBar post={post} />
          </div>
         : null}

        {props.auth.uid === post.userId ?
          <span className='edit' onClick={handleEditFieldStateClick}>Edit</span>
          : null
        }

        {editFieldState.editViz ?
          <div className='box create-post'>
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
                  <span className='optional has-text-grey-light'> (optional)</span>
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
                  <span className='optional has-text-grey-light'> (optional)</span>
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
                {/* <progress className='progress is-link' value='0' max='100'>0%</progress> */}
              </div>
              <div className='field'>
                <div className='control'>
                  <button className='button is-info'>SUBMIT</button>
                </div>
              </div>
            </form>
          </div>
        : null}
      </div>
    )
  } else {
    return (
      <h4>Loading Component</h4>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null
  return {
    post: post,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editPost: (post) => dispatch(editPost(post))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'posts'}
  ])
)(Post)
