import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
      content: '',
      imgUrl: '',
      postDate: '',
      toHomepage: false,
      userId: ''
    };
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      userId: this.props.auth.uid
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      postDate: firebase.firestore.FieldValue.serverTimestamp()
    });
    this.props.createPost(this.state);
    this.setState({
      title: '',
      content: '',
      toHomepage: true,
      userId: this.props.auth.uid
    });
  };

  render() {
    if (!this.props.auth.uid) {
      return <Redirect to='/signin' />
    }

    if (this.state.toHomepage === true) {
      return <Redirect to='/' />
    }

    return (
      <div className='box create-post'>
        <h3 className='title is-size-4'>Create your Blergit post</h3>

        <form onSubmit={this.handleSubmit} className='new-post-form'>
          <div className='field'>
            <label htmlFor='title' className='label'>Title</label>
            <div className='control'>
              <input
                type='text'
                id='title'
                className='input'
                onChange={this.handleInputChange}
                value={this.state.title}/>
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
                onChange={this.handleInputChange}
                value={this.state.content}></textarea>
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
                onChange={this.handleInputChange}
                value={this.state.imgUrl}/>
            </div>
          </div>
          <div className="field">
            <label htmlFor='title' className='label'>Upload image file
              <span className='has-text-grey-light'> (optional)</span>
            </label>
            <label className="file-label">
              <input
                type="file"
                className="file-input" />
              <span className="file-cta">
                <span className="file-label">
                  Choose a file…
                </span>
              </span>
            </label>
            <progress className="progress is-link" value="0" max="100">0%</progress>
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