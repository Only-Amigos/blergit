import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { createPost } from '../../store/actions/postsActions';
// import { firestoreConnect } from 'react-redux-firebase';
// import { compose } from 'redux';

class Post extends Component {
  render() {
    // console.log(this.props.post);
    return (
      <li>
        <h4>{this.props.post.title}</h4>
        <p>{this.props.post.content}</p>
      </li>
    )
  }
}

export default Post;