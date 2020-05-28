import React from 'react';
import { connect } from 'react-redux';
import { createPost, deletePost } from '../../store/actions/postsActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import SocialBar from '../SocialBar/SocialBar';

const PostList = (props) => {
  const handleDeletePost = (id) => {
    props.deletePost(id);
  };

  return (
    <div className='postlist'>
      <h3 className='has-text-centered is-size-4'>Posts:</h3>

      <div className='postlist-wrap columns'>
        {props.posts && props.posts.map(post => {
          return (
            <div className='postlist-post column is-4' key={post.id}>
              <div className="box postlist-post__spacing">
                <Link to={`/posts/${post.id}`}>
                  <h4 className='title is-size-5 has-text-weight-medium has-text-black-ter'>{post.title}</h4>

                  {post.createdAt ? <p className="date-time is-size-6 has-text-grey">Posted at {post.createdAt}</p> : null}

                  <p className='content is-size-6 has-text-grey-dark'>{post.content}</p>
                </Link>

                <SocialBar post={post} />
              </div>

              {props.auth.uid === post.userId ?
                <span className='delete' onClick={handleDeletePost.bind(this, post.id)}></span>
                : null
              }
            </div>
          )
        })}
      </div>
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
    createPost: (post) => dispatch(createPost(post)),
    deletePost: (id) => dispatch(deletePost(id))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    {collection: 'posts'}
  ])
)(PostList)
