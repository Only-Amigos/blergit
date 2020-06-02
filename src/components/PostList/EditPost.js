import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { deletePost } from '../../store/actions/postsActions';

const EditPost = (props) => {
  const { post } = props;

  console.log(props)

  return (
    <h1>Edit Page</h1>
  )
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

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect([
    {collection: 'posts'}
  ])
)(EditPost)