import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Post = (props) => {
  const { post } = props;
  if (post) {
    return (
      <li className="post">
        <h4>{post.title}</h4>
        <p>{post.content}</p>
      </li>
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
