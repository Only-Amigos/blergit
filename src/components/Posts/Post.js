import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

const Post = (props) => {
  const {post} = props

  if (post) {
    return (
      <li>
        <h2>POST ITEM</h2>
        <h4>{post.title}</h4>
        <p>{post.content}</p>
      </li>
    )
  } else {
    return (
      <div>LOADING POST...</div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  // const posts = state.firestore.data.posts;
  // const post = posts ? posts[id] : null
  // return {
  //   post: post
  // }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    {collection: 'posts'}
  ])
)(Post);