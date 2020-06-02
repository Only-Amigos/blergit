import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import SocialBar from '../SocialBar/SocialBar';

const Post = (props) => {
  const { post } = props;

  if (post) {
    return (
      <div className="box postlist-post__spacing">
        <h4 className='title is-size-5 has-text-weight-medium has-text-black-ter'>{post.title}</h4>

        {post.createdAt ? <p className="date-time is-size-6 has-text-grey">Posted at {post.createdAt}</p> : null}

        <div className='innerContentWrapper'>
          <p className='content is-size-6 has-text-grey-dark'>{post.content}</p>
          {post.imgUrl ? <img className='post-image' src={post.imgUrl} alt={post.title}/> : null}
        </div>
        <SocialBar post={post} />
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
    post: post
  }
}

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect([
    {collection: 'posts'}
  ])
)(Post)
