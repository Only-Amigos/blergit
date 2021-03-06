import React, { Component } from 'react';
import firebase from 'firebase/app';
import { connect } from 'react-redux';
import { createPost } from '../../store/actions/postsActions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      titleValue: '',
      content: '',
      contentValue: '',
      postDate: ''
    };
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      [`${e.target.id}Value`]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      titleValue: '',
      contentValue: '',
      postDate: firebase.firestore.FieldValue.serverTimestamp()
    });

    this.props.createPost(this.state);
  };

  render() {
    return (
      <div>
        <h1>Welcome to the CreatePost page</h1>

        <form onSubmit={this.handleSubmit} className='new-post-form'>
          <input
            type='text'
            id='title'
            onChange={this.handleInputChange}
            value={this.state.titleValue}/>
          <textarea
            id='content'
            cols='50'
            rows='10'
            onChange={this.handleInputChange}
            value={this.state.contentValue}></textarea>
          <div className='control'>
            <button className='button'>SUBMIT</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.firestore.ordered.posts || state.posts.posts
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